import logging
from uuid import UUID
from typing import Dict, Any, List
from sqlalchemy.ext.asyncio import AsyncSession
from app.modules.ai.repository import AIDecisionRepository
from app.modules.ai.models import AIDecision
from app.modules.ai.models import AIContext

logger = logging.getLogger("gaurdian.ai.reasoning")

class ReasoningEngine:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.repo = AIDecisionRepository(db)

    async def analyze_threats(self, context: AIContext) -> AIDecision:
        trip_id = context.trip_id
        risk_score = context.global_risk_score
        
        # 1. Draft Explanation / SHAP attribution heuristics
        reasoning_chain = {
            "attributions": {
                "fatigue": float(context.driver_fatigue_score * 0.4),
                "weather": float(context.weather_severity * 0.2),
                "speed": float(context.active_agent_states.get("vehicle_agent") == "SPEEDING") * 0.2,
                "traction": float(context.road_condition != "NORMAL") * 0.2
            },
            "summary": "AI Guardian identified elevated accident risks due to driver fatigue and slick roads.",
            "decision_path": "Perception -> FatigueDetected -> WeatherSlick -> SafetyThresholdExceeded -> RecommendRest"
        }
        
        # 2. Select actions based on threat level
        proposed_actions = []
        confidence = 0.95
        
        if risk_score > 70.0:
            proposed_actions.append({
                "command": "TRIGGER_CABIN_ALERT",
                "params": {"sound": "alarm_beep", "volume": "high", "display_message": "CRITICAL RISK: Please slow down and pull over immediately!"}
            })
            proposed_actions.append({
                "command": "DISPATCH_SOS_ALERT",
                "params": {"priority": "HIGH"}
            })
            status = "PENDING_DRIVER"
        elif risk_score > 40.0:
            proposed_actions.append({
                "command": "SUGGEST_COACHING",
                "params": {"speech": "I noticed some indicators of fatigue. Shall we schedule a coffee stop ahead?"}
            })
            status = "PENDING_DRIVER"
        else:
            proposed_actions.append({
                "command": "SYSTEM_MONITOR_NORMAL",
                "params": {}
            })
            status = "AUTO_BYPASSED"
            confidence = 0.99
            
        decision_data = {
            "trip_id": trip_id,
            "reasoning_chain": reasoning_chain,
            "confidence_score": confidence,
            "proposed_actions": {"actions": proposed_actions},
            "status": status
        }
        
        logger.info(f"Reasoning completed for Trip {trip_id}. Confidence: {confidence*100}%")
        return await self.repo.create(decision_data)
