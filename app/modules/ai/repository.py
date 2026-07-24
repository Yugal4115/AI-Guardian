from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.modules.base_repository import BaseRepository
from app.modules.ai.models import AIContext, AIMemory, AIDecision, ConversationSession, ConversationMessage

class AIContextRepository(BaseRepository[AIContext]):
    def __init__(self, db: AsyncSession):
        super().__init__(AIContext, db)

    async def get_latest_by_trip(self, trip_id: UUID) -> AIContext | None:
        result = await self.db.execute(
            select(AIContext)
            .filter(AIContext.trip_id == trip_id)
            .order_by(AIContext.recorded_at.desc())
        )
        return result.scalars().first()

class AIMemoryRepository(BaseRepository[AIMemory]):
    def __init__(self, db: AsyncSession):
        super().__init__(AIMemory, db)

    async def query_memories_by_type(self, memory_type: str, limit: int = 20):
        result = await self.db.execute(
            select(AIMemory)
            .filter(AIMemory.type == memory_type)
            .order_by(AIMemory.importance_weight.desc(), AIMemory.last_accessed_at.desc())
            .limit(limit)
        )
        return list(result.scalars().all())

class AIDecisionRepository(BaseRepository[AIDecision]):
    def __init__(self, db: AsyncSession):
        super().__init__(AIDecision, db)

    async def get_decisions_by_trip(self, trip_id: UUID):
        result = await self.db.execute(
            select(AIDecision)
            .filter(AIDecision.trip_id == trip_id)
            .order_by(AIDecision.created_at.desc())
        )
        return list(result.scalars().all())

class ConversationSessionRepository(BaseRepository[ConversationSession]):
    def __init__(self, db: AsyncSession):
        super().__init__(ConversationSession, db)

    async def get_active_session(self, driver_id: UUID) -> ConversationSession | None:
        result = await self.db.execute(
            select(ConversationSession)
            .filter(
                ConversationSession.driver_id == driver_id,
                ConversationSession.ended_at.is_(None)
            )
        )
        return result.scalars().first()

class ConversationMessageRepository(BaseRepository[ConversationMessage]):
    def __init__(self, db: AsyncSession):
        super().__init__(ConversationMessage, db)

    async def get_session_history(self, session_id: UUID):
        result = await self.db.execute(
            select(ConversationMessage)
            .filter(ConversationMessage.session_id == session_id)
            .order_by(ConversationMessage.timestamp.asc())
        )
        return list(result.scalars().all())
