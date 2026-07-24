import uuid
import datetime
from sqlalchemy import DateTime, func, TypeDecorator
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base

class UTCDateTime(TypeDecorator):
    """
    Enforces timezone-aware UTC datetimes on both binds and reads.
    Solves naive datetime issues in SQLite where tzinfo is lost.
    """
    impl = DateTime(timezone=True)
    cache_ok = True

    def process_bind_param(self, value, dialect):
        if value is not None:
            if value.tzinfo is None:
                value = value.replace(tzinfo=datetime.timezone.utc)
            else:
                value = value.astimezone(datetime.timezone.utc)
        return value

    def process_result_value(self, value, dialect):
        if value is not None:
            if value.tzinfo is None:
                value = value.replace(tzinfo=datetime.timezone.utc)
            else:
                value = value.astimezone(datetime.timezone.utc)
        return value

class AuditModel(Base):
    __abstract__ = True

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        index=True
    )
    
    created_at: Mapped[datetime.datetime] = mapped_column(
        UTCDateTime,
        server_default=func.now(),
        index=True,
        nullable=False
    )
    
    updated_at: Mapped[datetime.datetime] = mapped_column(
        UTCDateTime,
        server_default=func.now(),
        onupdate=func.now(),
        index=True,
        nullable=False
    )
    
    deleted_at: Mapped[datetime.datetime | None] = mapped_column(
        UTCDateTime,
        default=None,
        index=True,
        nullable=True
    )

    def delete(self):
        """Soft delete model by marking the timestamp."""
        self.deleted_at = datetime.datetime.now(datetime.timezone.utc)

