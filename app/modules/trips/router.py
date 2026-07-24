from uuid import UUID
from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.modules.trips.service import TripService
from app.modules.schemas import TripCreate, TripResponse

router = APIRouter(tags=["Trips"])

@router.post("/start", response_model=TripResponse, status_code=status.HTTP_201_CREATED)
async def start_driving_trip(
    trip_in: TripCreate,
    db: AsyncSession = Depends(get_db)
):
    service = TripService(db)
    return await service.start_trip(trip_in)

@router.post("/{trip_id}/end", response_model=TripResponse)
async def end_driving_trip(
    trip_id: UUID,
    total_distance: float = Query(..., description="Miles traveled"),
    total_fuel: float = Query(..., description="Gallons or kWh consumed"),
    db: AsyncSession = Depends(get_db)
):
    service = TripService(db)
    return await service.end_trip(trip_id, total_distance, total_fuel)

@router.get("/{trip_id}", response_model=TripResponse)
async def get_trip_details(
    trip_id: UUID,
    db: AsyncSession = Depends(get_db)
):
    service = TripService(db)
    return await service.get_trip(trip_id)
