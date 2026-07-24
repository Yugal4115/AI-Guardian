from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.core.dependencies import get_current_user, RoleChecker
from app.modules.drivers.service import DriverService
from app.modules.schemas import DriverCreate, DriverResponse, DriverBehaviorLogCreate, DriverBehaviorLogResponse

router = APIRouter(tags=["Drivers"])

@router.post("/", response_model=DriverResponse, status_code=status.HTTP_201_CREATED)
async def create_driver_profile(
    driver_in: DriverCreate,
    current_user = Depends(RoleChecker(["ADMIN", "FLEET_MANAGER"])),
    db: AsyncSession = Depends(get_db)
):
    service = DriverService(db)
    return await service.create_driver(driver_in)

@router.get("/{driver_id}", response_model=DriverResponse)
async def get_driver_profile(
    driver_id: UUID,
    db: AsyncSession = Depends(get_db)
):
    service = DriverService(db)
    return await service.get_driver(driver_id)

@router.post("/{driver_id}/behavior", response_model=DriverBehaviorLogResponse, status_code=status.HTTP_201_CREATED)
async def log_driver_behavior(
    driver_id: UUID,
    log_in: DriverBehaviorLogCreate,
    db: AsyncSession = Depends(get_db)
):
    service = DriverService(db)
    return await service.log_behavior(driver_id, log_in)

@router.get("/{driver_id}/behavior", response_model=List[DriverBehaviorLogResponse])
async def get_driver_behavior_history(
    driver_id: UUID,
    limit: int = 50,
    db: AsyncSession = Depends(get_db)
):
    service = DriverService(db)
    return await service.get_behavior_history(driver_id, limit)
