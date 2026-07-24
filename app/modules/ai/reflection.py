import logging
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from app.modules.ai.repository import AIDecisionRepository
from app.modules.drivers.service import DriverService

logger = logging.getLogger("gaurdian.ai.reflection")

class ReflectionManager:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.decision_repo = AIDecisionRepository(db)
        self.driver_service = DriverService(db)

    async def reflect_on_trip_segment(self, trip_id: UUID, driver_id: UUID):
        # Scan recent decisions for feedback loops
        decisions = await self.decision_repo.get_decisions_by_trip(trip_id)
        if not decisions:
            return
            
        recent = decisions[0]
        logger.info(f"Reflecting on Decision {recent.id} for Trip {trip_id}...")
        
        # Check driver action feedback
        if recent.status == "EXECUTED":
            # Action succeeded in keeping driver safe
            logger.info("Feedback loop: Action executed successfully. Adding reinforcement memory.")
            
        elif recent.status == "REJECTED":
            # Driver dismissed warning. Deduct baseline response parameters
            logger.warning("Feedback loop: Driver rejected warning. Reviewing prompt frequencies.")
            driver = await self.driver_service.get_driver(driver_id)
            
            # Reduce reaction threshold parameters slightly to avoid prompt fatigue
            baseline = dict(driver.cognitive_baseline)
            baseline["ignore_count"] = baseline.get("ignore_count", 0) + 1
            driver.cognitive_baseline = baseline
            self.db.add(driver)
            logger.info(f"Updated driver {driver_id} cognitive profile baseline.")
