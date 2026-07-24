from uuid import UUID
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.core.dependencies import RoleChecker
from app.modules.fleet.service import FleetService
from app.modules.schemas import FleetCreate, FleetResponse

router = APIRouter(tags=["Fleets"])

@router.post("/", response_model=FleetResponse, status_code=status.HTTP_201_CREATED)
async def create_new_fleet(
    fleet_in: FleetCreate,
    current_user = Depends(RoleChecker(["ADMIN", "FLEET_MANAGER"])),
    db: AsyncSession = Depends(get_db)
):
    service = FleetService(db)
    return await service.create_fleet(fleet_in)

@router.post("/{fleet_id}/vehicles/{vehicle_id}", response_model=FleetResponse)
async def assign_vehicle_to_fleet(
    fleet_id: UUID,
    vehicle_id: UUID,
    current_user = Depends(RoleChecker(["ADMIN", "FLEET_MANAGER"])),
    db: AsyncSession = Depends(get_db)
):
    service = FleetService(db)
    return await service.add_vehicle_to_fleet(fleet_id, vehicle_id)

@router.post("/{fleet_id}/drivers/{driver_id}", response_model=FleetResponse)
async def assign_driver_to_fleet(
    fleet_id: UUID,
    driver_id: UUID,
    current_user = Depends(RoleChecker(["ADMIN", "FLEET_MANAGER"])),
    db: AsyncSession = Depends(get_db)
):
    service = FleetService(db)
    return await service.add_driver_to_fleet(fleet_id, driver_id)

@router.get("/{fleet_id}/analytics")
async def get_fleet_performance_metrics(
    fleet_id: UUID,
    current_user = Depends(RoleChecker(["ADMIN", "FLEET_MANAGER", "DISPATCHER"])),
    db: AsyncSession = Depends(get_db)
):
    service = FleetService(db)
    return await service.get_fleet_analytics(fleet_id)
