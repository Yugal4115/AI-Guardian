from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.modules.fleet.repository import FleetRepository
from app.modules.schemas import FleetCreate
from app.exceptions import NotFoundException, ConflictException
from app.modules.fleet.models import Fleet
from app.modules.vehicles.models import Vehicle
from app.modules.drivers.models import Driver

class FleetService:
    def __init__(self, db: AsyncSession):
        self.fleet_repo = FleetRepository(db)
        self.db = db

    async def get_fleet(self, fleet_id: UUID) -> Fleet:
        fleet = await self.fleet_repo.get(fleet_id)
        if not fleet:
            raise NotFoundException("Fleet not found")
        return fleet

    async def create_fleet(self, fleet_in: FleetCreate) -> Fleet:
        existing = await self.fleet_repo.get_by_name(fleet_in.name)
        if existing:
            raise ConflictException("Fleet with this name already exists")
        return await self.fleet_repo.create(fleet_in.model_dump())

    async def add_vehicle_to_fleet(self, fleet_id: UUID, vehicle_id: UUID):
        fleet = await self.get_fleet(fleet_id)
        
        result = await self.db.execute(select(Vehicle).filter(Vehicle.id == vehicle_id))
        vehicle = result.scalars().first()
        if not vehicle:
            raise NotFoundException("Vehicle not found")
            
        fleet.vehicles.append(vehicle)
        self.db.add(fleet)
        return fleet

    async def add_driver_to_fleet(self, fleet_id: UUID, driver_id: UUID):
        fleet = await self.get_fleet(fleet_id)
        
        result = await self.db.execute(select(Driver).filter(Driver.id == driver_id))
        driver = result.scalars().first()
        if not driver:
            raise NotFoundException("Driver not found")
            
        fleet.drivers.append(driver)
        self.db.add(fleet)
        return fleet

    async def get_fleet_analytics(self, fleet_id: UUID):
        # Dynamically calculate fleet average safety scores and details
        # Local imports inside service methods to avoid module cyclic dependencies
        from sqlalchemy import func
        fleet = await self.get_fleet(fleet_id)
        
        driver_ids = [d.id for d in fleet.drivers]
        avg_safety = 100.0
        if driver_ids:
            res = await self.db.execute(
                select(func.avg(Driver.safety_score)).filter(Driver.id.in_(driver_ids))
            )
            avg_safety = res.scalar() or 100.0
            
        return {
            "fleet_id": fleet_id,
            "name": fleet.name,
            "total_vehicles": len(fleet.vehicles),
            "total_drivers": len(fleet.drivers),
            "average_safety_score": float(avg_safety)
        }
