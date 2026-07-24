from datetime import datetime, timedelta, timezone
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from app.modules.maintenance.repository import MaintenanceRepository
from app.modules.schemas import MaintenanceTaskCreate
from app.exceptions import NotFoundException, ConflictException
from app.modules.maintenance.models import MaintenanceTask

class MaintenanceService:
    def __init__(self, db: AsyncSession):
        self.repo = MaintenanceRepository(db)

    async def get_task(self, task_id: UUID) -> MaintenanceTask:
        task = await self.repo.get(task_id)
        if not task:
            raise NotFoundException("Maintenance task not found")
        return task

    async def list_by_vehicle(self, vehicle_id: UUID):
        return await self.repo.get_by_vehicle(vehicle_id)

    async def create_task(self, task_in: MaintenanceTaskCreate) -> MaintenanceTask:
        # Business Logic: Auto-calculate cost-benefit comparison if not provided
        data = task_in.model_dump()
        if not data.get("cost_benefit_analysis"):
            repair_cost = 150.0
            replacement_cost = 600.0
            downtime_penalty = 200.0
            
            # Simple heuristic
            savings = (replacement_cost + downtime_penalty) - repair_cost
            data["cost_benefit_analysis"] = {
                "repair_estimate": repair_cost,
                "replacement_estimate": replacement_cost,
                "potential_savings": savings,
                "recommendation": "REPAIR_IMMEDIATELY" if savings > 300 else "REPAIR_ON_SCHEDULE"
            }
            
        return await self.repo.create(data)

    async def update_status(self, task_id: UUID, status: str) -> MaintenanceTask:
        task = await self.get_task(task_id)
        task.status = status
        if status == "COMPLETED":
            # Auto-reset RUL forecasting params
            task.remaining_useful_life_days = 365.0
            task.estimated_failure_time = datetime.now(timezone.utc) + timedelta(days=365)
            task.urgency_score = 0.0
        self.repo.db.add(task)
        return task

    async def trigger_parts_preorder(self, task_id: UUID) -> MaintenanceTask:
        task = await self.get_task(task_id)
        task.parts_preordered = True
        self.repo.db.add(task)
        return task
