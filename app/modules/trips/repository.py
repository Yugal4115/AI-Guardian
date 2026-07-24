from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.modules.base_repository import BaseRepository
from app.modules.trips.models import Trip

class TripRepository(BaseRepository[Trip]):
    def __init__(self, db: AsyncSession):
        super().__init__(Trip, db)

    async def get_active_trip_by_driver(self, driver_id: UUID) -> Trip | None:
        result = await self.db.execute(
            select(Trip).filter(
                Trip.driver_id == driver_id,
                Trip.end_time.is_(None),
                Trip.deleted_at.is_(None)
            )
        )
        return result.scalars().first()

    async def get_active_trip_by_vehicle(self, vehicle_id: UUID) -> Trip | None:
        result = await self.db.execute(
            select(Trip).filter(
                Trip.vehicle_id == vehicle_id,
                Trip.end_time.is_(None),
                Trip.deleted_at.is_(None)
            )
        )
        return result.scalars().first()
