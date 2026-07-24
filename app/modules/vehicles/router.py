from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.core.dependencies import RoleChecker
from app.modules.vehicles.service import VehicleService
from app.modules.schemas import VehicleCreate, VehicleResponse, TelemetryCreate, TelemetryResponse

router = APIRouter(tags=["Vehicles"])

@router.post("/", response_model=VehicleResponse, status_code=status.HTTP_201_CREATED)
async def register_vehicle(
    vehicle_in: VehicleCreate,
    current_user = Depends(RoleChecker(["ADMIN", "FLEET_MANAGER"])),
    db: AsyncSession = Depends(get_db)
):
    service = VehicleService(db)
    return await service.create_vehicle(vehicle_in)

@router.get("/{vehicle_id}", response_model=VehicleResponse)
async def get_vehicle_details(
    vehicle_id: UUID,
    db: AsyncSession = Depends(get_db)
):
    service = VehicleService(db)
    return await service.get_vehicle(vehicle_id)

@router.post("/{vehicle_id}/telemetry", response_model=TelemetryResponse, status_code=status.HTTP_201_CREATED)
async def log_vehicle_telemetry(
    vehicle_id: UUID,
    telemetry_in: TelemetryCreate,
    db: AsyncSession = Depends(get_db)
):
    service = VehicleService(db)
    return await service.log_telemetry(vehicle_id, telemetry_in)

@router.get("/{vehicle_id}/telemetry/latest", response_model=TelemetryResponse)
async def get_latest_vehicle_telemetry(
    vehicle_id: UUID,
    db: AsyncSession = Depends(get_db)
):
    service = VehicleService(db)
    telemetry = await service.get_latest_telemetry(vehicle_id)
    if not telemetry:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="No telemetry logged for this vehicle")
    return telemetry
