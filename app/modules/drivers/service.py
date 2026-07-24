from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from app.modules.drivers.repository import DriverRepository, DriverBehavioralLogRepository
from app.modules.schemas import DriverCreate, DriverBehaviorLogCreate
from app.exceptions import NotFoundException, ConflictException
from app.modules.drivers.models import Driver, DriverBehavioralLog

class DriverService:
    def __init__(self, db: AsyncSession):
        self.driver_repo = DriverRepository(db)
        self.log_repo = DriverBehavioralLogRepository(db)

    async def get_driver(self, driver_id: UUID) -> Driver:
        driver = await self.driver_repo.get(driver_id)
        if not driver:
            raise NotFoundException("Driver profile not found")
        return driver

    async def get_by_user_id(self, user_id: UUID) -> Driver:
        driver = await self.driver_repo.get_by_user_id(user_id)
        if not driver:
            raise NotFoundException("Driver not registered")
        return driver

    async def create_driver(self, driver_in: DriverCreate) -> Driver:
        existing = await self.driver_repo.get_by_user_id(driver_in.user_id)
        if existing:
            raise ConflictException("User already has a driver profile")
        return await self.driver_repo.create(driver_in.model_dump())

    async def set_active_status(self, driver_id: UUID, is_active: bool) -> Driver:
        driver = await self.get_driver(driver_id)
        driver.is_active_duty = is_active
        self.driver_repo.db.add(driver)
        return driver

    async def log_behavior(self, driver_id: UUID, log_in: DriverBehaviorLogCreate) -> DriverBehavioralLog:
        driver = await self.get_driver(driver_id)
        
        # Calculate impact on safety score
        # High fatigue/distraction decreases safety score
        penalty = 0.0
        if log_in.fatigue_score > 0.6:
            penalty += (log_in.fatigue_score - 0.6) * 10
        if log_in.distraction_flag:
            penalty += 5.0
        if log_in.stress_level > 0.8:
            penalty += 2.0
            
        if penalty > 0:
            driver.safety_score = max(0.0, driver.safety_score - penalty)
            self.driver_repo.db.add(driver)
            
        log_data = log_in.model_dump()
        log_data["driver_id"] = driver_id
        return await self.log_repo.create(log_data)

    async def get_behavior_history(self, driver_id: UUID, limit: int = 50):
        return await self.log_repo.get_recent_logs(driver_id, limit)
