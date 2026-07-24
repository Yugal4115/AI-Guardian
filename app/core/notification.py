import logging
from typing import Dict, Any

logger = logging.getLogger("gaurdian.notifications")

class NotificationDispatcher:
    async def send_email(self, recipient: str, subject: str, body: str) -> bool:
        # Mock Email send logic
        logger.info(f"[EMAIL] To: {recipient} | Subject: {subject} | Body: {body[:100]}...")
        return True

    async def send_sms(self, phone: str, message: str) -> bool:
        # Mock SMS send logic
        logger.info(f"[SMS] To: {phone} | Msg: {message}")
        return True

    async def send_push_notification(self, device_token: str, title: str, body: str, payload: Dict[str, Any] = None) -> bool:
        # Mock Mobile Push logic
        logger.info(f"[PUSH] To Device: {device_token} | Title: {title} | Body: {body} | Payload: {payload}")
        return True

    async def send_slack_alert(self, webhook_url: str, message: str) -> bool:
        # Mock Slack Notification
        logger.info(f"[SLACK Webhook] Msg: {message}")
        return True

    async def broadcast_critical_alert(self, target_entity: str, title: str, description: str):
        # Coordinates multi-channel notifications for high-priority/SOS states
        logger.warning(f"[CRITICAL ALERT BROADCAST] Target: {target_entity} | Title: {title} | Desc: {description}")
        # Run notification loops in parallel
        await self.send_sms("+15550009999", f"CRITICAL: {title} - {description}")
        await self.send_push_notification("mock-device-token", title, description)

notification_dispatcher = NotificationDispatcher()
