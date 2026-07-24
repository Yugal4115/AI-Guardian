from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.modules.base_repository import BaseRepository
from app.modules.maintenance.models import MaintenanceTask

class MaintenanceRepository(BaseRepository[MaintenanceTask]):
    def __init__(self, db: AsyncSession):
        super().__init__(MaintenanceTask, db)

    async def get_by_vehicle(self, vehicle_id: UUID):
        result = await self.db.execute(
            select(MaintenanceTask)
            .filter(MaintenanceTask.vehicle_id == vehicle_id, MaintenanceTask.deleted_at.is_(None))
            .order_by(MaintenanceTask.urgency_score.desc())
        )
        return list(result.scalars().all())
