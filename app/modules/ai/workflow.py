import logging
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
import redis.asyncio as aioredis
from app.modules.ai.context import ContextManager
from app.modules.ai.memory import MemoryManager
from app.modules.ai.reasoning import ReasoningEngine
from app.modules.ai.planning import PlanningEngine
from app.modules.ai.execution import ExecutionManager
from app.modules.ai.reflection import ReflectionManager

logger = logging.getLogger("gaurdian.ai.workflow")

class GAURDIANAgentWorkflow:
    def __init__(self, db: AsyncSession, redis_client: aioredis.Redis):
        self.db = db
        self.context_mgr = ContextManager(db)
        self.memory_mgr = MemoryManager(db, redis_client)
        self.reasoning_engine = ReasoningEngine(db)
        self.planning_engine = PlanningEngine()
        self.execution_mgr = ExecutionManager(db)
        self.reflection_mgr = ReflectionManager(db)

    async def execute_autonomy_cycle(self, trip_id: UUID, driver_id: UUID, vehicle_id: UUID, ws_broadcast_func=None) -> dict:
        """
        GAURDIAN Agentic Autonomy Loop execution.
        Coordinates the multi-agent decision steps within a fast transaction.
        """
        logger.info(f"--- STARTING AUTONOMY CYCLE FOR TRIP {trip_id} ---")
        
        # 1. PERCEPTION & CONTEXT FUSION
        context = await self.context_mgr.fuse_context(trip_id, driver_id, vehicle_id)
        
        # Write state to Redis short-term cache (L1 Memory)
        await self.memory_mgr.set_short_term_context(
            trip_id=str(trip_id),
            context_data=context.active_agent_states,
            ttl=120
        )
        
        # 2. MEMORY ENRICHMENT
        # Retrieve semantic safety rules for Slick Roads if applicable
        if context.road_condition != "NORMAL":
            semantic_memories = await self.memory_mgr.retrieve_memories(
                query="slick roads safety",
                memory_type="SEMANTIC",
                limit=2
            )
            logger.info(f"Enriched reasoning with {len(semantic_memories)} semantic safety rules.")
            
        # 3. REASONING ENGINE
        decision = await self.reasoning_engine.analyze_threats(context)
        
        # 4. PLANNING ENGINE
        optimized_plan = await self.planning_engine.optimize_action_plan(decision, human_overridden=False)
        
        # 5. EXECUTION FRAMEWORK
        if optimized_plan:
            await self.execution_mgr.execute_plan(decision, optimized_plan, ws_broadcast_func=ws_broadcast_func)
            
            # Save Episodic Memory of critical execution
            if decision.status == "EXECUTED":
                await self.memory_mgr.commit_memory(
                    memory_type="EPISODIC",
                    payload={
                        "trip_id": str(trip_id),
                        "event": "SAFETY_ACTION_TAKEN",
                        "risk_score": context.global_risk_score,
                        "actions": decision.action_taken
                    },
                    weight=5.0
                )
        
        # 6. REFLECTION & LEARNING
        await self.reflection_mgr.reflect_on_trip_segment(trip_id, driver_id)
        
        logger.info(f"--- COMPLETED AUTONOMY CYCLE FOR TRIP {trip_id} ---")
        return {
            "context_id": context.id,
            "risk_score": context.global_risk_score,
            "decision_id": decision.id,
            "status": decision.status,
            "actions_executed": decision.action_taken
        }
        
    async def get_langgraph_state_hook(self) -> dict:
        """
        Hook entrypoint for integrating LangGraph compilation graphs.
        Exposes node dictionary structures to state graphs.
        """
        return {
            "nodes": {
                "perceive": self.context_mgr.fuse_context,
                "reason": self.reasoning_engine.analyze_threats,
                "plan": self.planning_engine.optimize_action_plan,
                "execute": self.execution_mgr.execute_plan,
                "reflect": self.reflection_mgr.reflect_on_trip_segment
            }
        }
