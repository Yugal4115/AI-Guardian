import uuid
from sqlalchemy import String, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column
from app.modules.base_models import AuditModel

class Settings(AuditModel):
    __tablename__ = "settings"

    # Owner entity can be a user_id, fleet_id or 'global'
    owner_id: Mapped[str] = mapped_column(String(100), default="global", index=True, nullable=False)
    key: Mapped[str] = mapped_column(String(100), index=True, nullable=False)
    value: Mapped[dict] = mapped_column(JSON, default=dict, nullable=False)
