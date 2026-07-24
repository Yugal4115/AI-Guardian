from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.modules.base_repository import BaseRepository
from app.modules.vehicles.models import Vehicle, TelemetryLog

class VehicleRepository(BaseRepository[Vehicle]):
    def __init__(self, db: AsyncSession):
        super().__init__(Vehicle, db)

    async def get_by_vin(self, vin: str) -> Vehicle | None:
        result = await self.db.execute(
            select(Vehicle).filter(Vehicle.vin == vin, Vehicle.deleted_at.is_(None))
        )
        return result.scalars().first()

class TelemetryLogRepository(BaseRepository[TelemetryLog]):
    def __init__(self, db: AsyncSession):
        super().__init__(TelemetryLog, db)

    async def get_recent_logs(self, vehicle_id: UUID, limit: int = 100):
        result = await self.db.execute(
            select(TelemetryLog)
            .filter(TelemetryLog.vehicle_id == vehicle_id)
            .order_by(TelemetryLog.timestamp.desc())
            .limit(limit)
        )
        return list(result.scalars().all())

    async def get_latest_telemetry(self, vehicle_id: UUID) -> TelemetryLog | None:
        result = await self.db.execute(
            select(TelemetryLog)
            .filter(TelemetryLog.vehicle_id == vehicle_id)
            .order_by(TelemetryLog.timestamp.desc())
        )
        return result.scalars().first()
