from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.modules.base_repository import BaseRepository
from app.modules.drivers.models import Driver, DriverBehavioralLog

class DriverRepository(BaseRepository[Driver]):
    def __init__(self, db: AsyncSession):
        super().__init__(Driver, db)

    async def get_by_user_id(self, user_id: UUID) -> Driver | None:
        result = await self.db.execute(
            select(Driver).filter(Driver.user_id == user_id, Driver.deleted_at.is_(None))
        )
        return result.scalars().first()

class DriverBehavioralLogRepository(BaseRepository[DriverBehavioralLog]):
    def __init__(self, db: AsyncSession):
        super().__init__(DriverBehavioralLog, db)

    async def get_recent_logs(self, driver_id: UUID, limit: int = 50):
        result = await self.db.execute(
            select(DriverBehavioralLog)
            .filter(DriverBehavioralLog.driver_id == driver_id)
            .order_by(DriverBehavioralLog.recorded_at.desc())
            .limit(limit)
        )
        return list(result.scalars().all())
