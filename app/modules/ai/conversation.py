import logging
from uuid import UUID
from datetime import datetime, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from app.modules.ai.repository import ConversationSessionRepository, ConversationMessageRepository
from app.modules.ai.models import ConversationSession, ConversationMessage
from app.modules.ai.prompts import PromptTemplates
from app.exceptions import NotFoundException

logger = logging.getLogger("gaurdian.ai.conversation")

class ConversationManager:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.session_repo = ConversationSessionRepository(db)
        self.message_repo = ConversationMessageRepository(db)

    async def get_or_create_session(self, driver_id: UUID) -> ConversationSession:
        active = await self.session_repo.get_active_session(driver_id)
        if active:
            return active
        return await self.session_repo.create({"driver_id": driver_id})

    async def end_session(self, session_id: UUID):
        session = await self.session_repo.get(session_id)
        if not session:
            raise NotFoundException("Session not found")
        session.ended_at = datetime.now(timezone.utc)
        self.db.add(session)

    async def post_message(self, session_id: UUID, content: str, role: str = "user") -> ConversationMessage:
        message_data = {
            "session_id": session_id,
            "role": role,
            "content": content,
            "intent_classification": "GENERAL" if role == "user" else None,
            "reasoning_context": {}
        }
        return await self.message_repo.create(message_data)

    async def generate_response(self, session_id: UUID, driver_state_summary: str) -> ConversationMessage:
        # Fetch history
        history = await self.message_repo.get_session_history(session_id)
        last_user_message = history[-1].content if history else "Hello"
        
        # 1. Draft mock LLM generation responses
        # E.g. answering navigation, weather, safety status queries
        query = last_user_message.lower()
        
        if "weather" in query:
            reply = "Current conditions indicate slick roads ahead. I have optimized your route for safety."
            intent = "WEATHER_QUERY"
        elif "tire" in query or "pressure" in query:
            reply = "Tire pressure is normal at 35 PSI. Tread depth indicates 80% remaining useful life."
            intent = "DIAGNOSTIC_QUERY"
        elif "fatigue" in query or "tired" in query:
            reply = "I've flagged high fatigue readings. There is a rest stop in 4 miles on your right. Shall I route us there?"
            intent = "FATIGUE_ADVISORY"
        else:
            reply = f"Understood. I am monitoring your telemetry and surroundings to ensure a safe journey."
            intent = "GENERAL_STATEMENT"
            
        # 2. Persist assistant reply
        response_data = {
            "session_id": session_id,
            "role": "assistant",
            "content": reply,
            "intent_classification": intent,
            "reasoning_context": {"driver_state": driver_state_summary}
        }
        return await self.message_repo.create(response_data)
