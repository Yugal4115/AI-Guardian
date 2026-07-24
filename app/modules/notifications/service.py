from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.modules.notifications.models import Notification

class NotificationService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def log_notification(self, recipient_id: UUID, title: str, description: str, priority: str = "LOW", channel: str = "PUSH") -> Notification:
        obj = Notification(
            recipient_id=recipient_id,
            title=title,
            description=description,
            priority=priority,
            channel=channel,
            sent_status="SENT"
        )
        self.db.add(obj)
        await self.db.flush()
        return obj

    async def get_by_recipient(self, recipient_id: UUID, limit: int = 50):
        result = await self.db.execute(
            select(Notification)
            .filter(Notification.recipient_id == recipient_id, Notification.deleted_at.is_(None))
            .order_by(Notification.created_at.desc())
            .limit(limit)
        )
        return list(result.scalars().all())

    async def mark_as_read(self, notification_id: UUID) -> bool:
        result = await self.db.execute(select(Notification).filter(Notification.id == notification_id))
        obj = result.scalars().first()
        if obj:
            import datetime
            obj.read_at = datetime.datetime.now(datetime.timezone.utc)
            self.db.add(obj)
            return True
        return False
