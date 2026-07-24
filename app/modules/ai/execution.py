import logging
from typing import Dict, Any, List
from sqlalchemy.ext.asyncio import AsyncSession
from app.modules.ai.models import AIDecision
from app.core.notification import notification_dispatcher

logger = logging.getLogger("gaurdian.ai.execution")

class ExecutionManager:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def execute_plan(self, decision: AIDecision, plan: List[Dict[str, Any]], ws_broadcast_func=None):
        executed_commands = []
        for step in plan:
            cmd = step["command"]
            params = step["params"]
            
            logger.info(f"Executing Agent Command: {cmd} with parameters: {params}")
            
            if cmd == "TRIGGER_CABIN_ALERT":
                # Push real-time warning over active WebSocket
                if ws_broadcast_func:
                    await ws_broadcast_func({
                        "event": "CABIN_ALERT",
                        "data": params
                    })
                executed_commands.append(cmd)
                
            elif cmd == "DISPATCH_SOS_ALERT":
                # Emergency triage dispatch
                await notification_dispatcher.broadcast_critical_alert(
                    target_entity=f"Trip: {decision.trip_id}",
                    title="SOS Crash Alert",
                    description="AI Guardian flagged high-severity risk impact profiles."
                )
                executed_commands.append(cmd)
                
            elif cmd == "SUGGEST_COACHING":
                if ws_broadcast_func:
                    await ws_broadcast_func({
                        "event": "COACHING_PROMPT",
                        "data": params
                    })
                executed_commands.append(cmd)
                
            else:
                logger.debug(f"Command {cmd} processed as silent telemetry monitoring.")
                executed_commands.append(cmd)

        decision.status = "EXECUTED"
        decision.action_taken = ", ".join(executed_commands)
        self.db.add(decision)
        logger.info(f"Decision {decision.id} updated as EXECUTED.")
