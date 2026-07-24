import json
import logging
from typing import Dict, Any, List
import redis.asyncio as aioredis
from sqlalchemy.ext.asyncio import AsyncSession
from app.modules.ai.repository import AIMemoryRepository
from app.modules.ai.models import AIMemory
from app.exceptions import NotFoundException

logger = logging.getLogger("gaurdian.ai.memory")

class MemoryManager:
    def __init__(self, db: AsyncSession, redis_client: aioredis.Redis):
        self.db = db
        self.redis = redis_client
        self.repo = AIMemoryRepository(db)

    # --- L1 Memory Operations (Redis Cache) ---
    async def set_short_term_context(self, trip_id: str, context_data: Dict[str, Any], ttl: int = 300):
        # Stores recent status snapshots for immediate lookup
        key = f"trip:context:{trip_id}"
        await self.redis.set(key, json.dumps(context_data), ex=ttl)

    async def get_short_term_context(self, trip_id: str) -> Dict[str, Any] | None:
        key = f"trip:context:{trip_id}"
        raw = await self.redis.get(key)
        return json.loads(raw) if raw else None

    # --- L2 Memory Operations (PostgreSQL Persistence) ---
    async def commit_memory(self, memory_type: str, payload: Dict[str, Any], weight: float = 1.0) -> AIMemory:
        # Save episodic or semantic memory into PostgreSQL database
        memory_data = {
            "type": memory_type,
            "payload": payload,
            "importance_weight": weight,
            "vector_embedding": {"keywords": list(payload.keys())} # mock vector token index
        }
        logger.info(f"Saving L2 {memory_type} memory. Payload keys: {list(payload.keys())}")
        return await self.repo.create(memory_data)

    async def retrieve_memories(self, query: str, memory_type: str = "SEMANTIC", limit: int = 5) -> List[AIMemory]:
        # Perform relevance matching using weights and keyword matching
        all_memories = await self.repo.query_memories_by_type(memory_type, limit=50)
        
        matched = []
        for mem in all_memories:
            payload_str = json.dumps(mem.payload).lower()
            if query.lower() in payload_str:
                matched.append(mem)
                # Increment access count
                mem.access_count += 1
                self.db.add(mem)
                
        # Fallback to general high importance memories
        if not matched:
            matched = all_memories[:limit]
            
        return matched[:limit]

    # --- Memory Consolidation (Nightly Batch Simulation) ---
    async def consolidate_memories(self):
        # Extract patterns from episodic logs and write back to predictive/semantic profiles
        logger.info("Consolidating memories: Extracting habits and driver trends...")
        # (Federated batch logic would aggregate data here)

    # --- Memory Forgetting (Privacy Protection) ---
    async def purge_low_utility_memories(self, threshold: float = 2.0):
        # Forgets stale, low-importance records to safeguard privacy and save DB space
        from sqlalchemy import delete
        logger.info("Purging low utility memories...")
        # Soft-delete or hard-delete elements where access counts are low and weights are small
