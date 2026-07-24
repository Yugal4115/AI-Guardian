from datetime import datetime, timezone
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from app.modules.trips.repository import TripRepository
from app.modules.schemas import TripCreate
from app.exceptions import NotFoundException, ConflictException
from app.modules.trips.models import Trip

class TripService:
    def __init__(self, db: AsyncSession):
        self.trip_repo = TripRepository(db)

    async def get_trip(self, trip_id: UUID) -> Trip:
        trip = await self.trip_repo.get(trip_id)
        if not trip:
            raise NotFoundException("Trip not found")
        return trip

    async def get_active_trip_by_driver(self, driver_id: UUID) -> Trip | None:
        return await self.trip_repo.get_active_trip_by_driver(driver_id)

    async def start_trip(self, trip_in: TripCreate) -> Trip:
        # Verify no active trip exists for driver or vehicle
        active_driver_trip = await self.trip_repo.get_active_trip_by_driver(trip_in.driver_id)
        if active_driver_trip:
            raise ConflictException("Driver already has an active trip")
        
        active_vehicle_trip = await self.trip_repo.get_active_trip_by_vehicle(trip_in.vehicle_id)
        if active_vehicle_trip:
            raise ConflictException("Vehicle is currently in use on another trip")
            
        data = trip_in.model_dump()
        data["start_time"] = datetime.now(timezone.utc)
        data["efficiency_score"] = 100.0
        data["safety_score"] = 100.0
        
        return await self.trip_repo.create(data)

    async def end_trip(self, trip_id: UUID, total_distance: float, total_fuel: float) -> Trip:
        trip = await self.get_trip(trip_id)
        if trip.end_time:
            raise ConflictException("Trip has already been ended")
            
        trip.end_time = datetime.now(timezone.utc)
        trip.total_distance = total_distance
        trip.total_fuel_consumed = total_fuel
        
        # Simple Mock Score Calculation
        if total_distance > 0:
            # high fuel consumption decreases efficiency
            raw_eff = (total_distance / max(1.0, total_fuel)) * 3.0 # mock MPG conversion factor
            trip.efficiency_score = min(100.0, max(10.0, raw_eff))
            
        self.trip_repo.db.add(trip)
        return trip

    async def update_scores(self, trip_id: UUID, safety_score: float, efficiency_score: float) -> Trip:
        trip = await self.get_trip(trip_id)
        trip.safety_score = safety_score
        trip.efficiency_score = efficiency_score
        self.trip_repo.db.add(trip)
        return trip
