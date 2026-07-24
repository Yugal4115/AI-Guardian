import logging
from typing import Dict, Any, List
from app.modules.ai.models import AIDecision

logger = logging.getLogger("gaurdian.ai.planning")

class PlanningEngine:
    def __init__(self):
        pass

    async def optimize_action_plan(self, decision: AIDecision, human_overridden: bool = False) -> List[Dict[str, Any]]:
        # Enforces safety priority guardrails (Safety > Efficiency > Comfort)
        actions = decision.proposed_actions.get("actions", [])
        
        if human_overridden:
            logger.warning(f"Driver overrode AI Plan for Decision {decision.id}. Cancelling pending suggestions.")
            decision.status = "REJECTED"
            return []

        optimized_plan = []
        for action in actions:
            cmd = action.get("command")
            params = action.get("params", {})
            
            # Constraint Enforcement
            if cmd == "DISPATCH_SOS_ALERT" and decision.confidence_score < 0.8:
                logger.warning("Rejecting SOS Dispatch plan: confidence index too low.")
                continue
                
            optimized_plan.append({
                "command": cmd,
                "params": params,
                "priority": "HIGH" if cmd in ["TRIGGER_CABIN_ALERT", "DISPATCH_SOS_ALERT"] else "MEDIUM"
            })
            
        logger.info(f"Action plan optimized with {len(optimized_plan)} active tasks.")
        return optimized_plan
