from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from app.modules.vehicles.repository import VehicleRepository, TelemetryLogRepository
from app.modules.schemas import VehicleCreate, TelemetryCreate
from app.exceptions import NotFoundException, ConflictException
from app.modules.vehicles.models import Vehicle, TelemetryLog

class VehicleService:
    def __init__(self, db: AsyncSession):
        self.vehicle_repo = VehicleRepository(db)
        self.telemetry_repo = TelemetryLogRepository(db)

    async def get_vehicle(self, vehicle_id: UUID) -> Vehicle:
        vehicle = await self.vehicle_repo.get(vehicle_id)
        if not vehicle:
            raise NotFoundException("Vehicle not found")
        return vehicle

    async def get_by_vin(self, vin: str) -> Vehicle:
        vehicle = await self.vehicle_repo.get_by_vin(vin)
        if not vehicle:
            raise NotFoundException("Vehicle VIN not found")
        return vehicle

    async def create_vehicle(self, vehicle_in: VehicleCreate) -> Vehicle:
        existing = await self.vehicle_repo.get_by_vin(vehicle_in.vin)
        if existing:
            raise ConflictException("Vehicle with this VIN already registered")
        return await self.vehicle_repo.create(vehicle_in.model_dump())

    async def update_status(self, vehicle_id: UUID, status: str) -> Vehicle:
        vehicle = await self.get_vehicle(vehicle_id)
        vehicle.current_status = status
        self.vehicle_repo.db.add(vehicle)
        return vehicle

    async def log_telemetry(self, vehicle_id: UUID, telemetry_in: TelemetryCreate) -> TelemetryLog:
        # Verify vehicle exists
        await self.get_vehicle(vehicle_id)
        
        telemetry_data = telemetry_in.model_dump()
        telemetry_data["vehicle_id"] = vehicle_id
        return await self.telemetry_repo.create(telemetry_data)

    async def get_latest_telemetry(self, vehicle_id: UUID) -> TelemetryLog | None:
        return await self.telemetry_repo.get_latest_telemetry(vehicle_id)

    async def get_telemetry_history(self, vehicle_id: UUID, limit: int = 100):
        return await self.telemetry_repo.get_recent_logs(vehicle_id, limit)
