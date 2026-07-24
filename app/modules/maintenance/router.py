from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.modules.maintenance.service import MaintenanceService
from app.modules.schemas import MaintenanceTaskCreate, MaintenanceTaskResponse

router = APIRouter(tags=["Maintenance"])

@router.post("/", response_model=MaintenanceTaskResponse, status_code=status.HTTP_201_CREATED)
async def schedule_maintenance_task(
    task_in: MaintenanceTaskCreate,
    db: AsyncSession = Depends(get_db)
):
    service = MaintenanceService(db)
    return await service.create_task(task_in)

@router.get("/vehicles/{vehicle_id}", response_model=List[MaintenanceTaskResponse])
async def get_vehicle_repair_tasks(
    vehicle_id: UUID,
    db: AsyncSession = Depends(get_db)
):
    service = MaintenanceService(db)
    return await service.list_by_vehicle(vehicle_id)

@router.post("/{task_id}/complete", response_model=MaintenanceTaskResponse)
async def mark_repair_task_completed(
    task_id: UUID,
    db: AsyncSession = Depends(get_db)
):
    service = MaintenanceService(db)
    return await service.update_status(task_id, "COMPLETED")

@router.post("/{task_id}/preorder-parts", response_model=MaintenanceTaskResponse)
async def pre_order_needed_parts(
    task_id: UUID,
    db: AsyncSession = Depends(get_db)
):
    service = MaintenanceService(db)
    return await service.trigger_parts_preorder(task_id)
