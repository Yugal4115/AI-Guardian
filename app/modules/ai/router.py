from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
import redis.asyncio as aioredis
from app.database import get_db
from app.redis import get_redis
from app.modules.ai.conversation import ConversationManager
from app.modules.ai.workflow import GAURDIANAgentWorkflow
from app.modules.ai.repository import AIDecisionRepository
from app.modules.schemas import (
    ConversationSessionResponse,
    ConversationMessageResponse,
    ConversationMessageCreate,
    AIDecisionResponse
)

router = APIRouter(tags=["Agentic AI"])

@router.post("/sessions", response_model=ConversationSessionResponse, status_code=status.HTTP_201_CREATED)
async def start_voice_session(
    driver_id: UUID,
    db: AsyncSession = Depends(get_db)
):
    mgr = ConversationManager(db)
    return await mgr.get_or_create_session(driver_id)

@router.post("/sessions/{session_id}/messages", response_model=ConversationMessageResponse, status_code=status.HTTP_201_CREATED)
async def post_chat_message(
    session_id: UUID,
    msg_in: ConversationMessageCreate,
    driver_state_summary: str = Query("normal", description="Current behavioral state of the driver"),
    db: AsyncSession = Depends(get_db)
):
    mgr = ConversationManager(db)
    # 1. Post user message
    await mgr.post_message(session_id, msg_in.content, role="user")
    # 2. Get AI assistant response
    return await mgr.generate_response(session_id, driver_state_summary)

@router.get("/decisions/trips/{trip_id}", response_model=List[AIDecisionResponse])
async def list_ai_decisions_by_trip(
    trip_id: UUID,
    db: AsyncSession = Depends(get_db)
):
    repo = AIDecisionRepository(db)
    return await repo.get_decisions_by_trip(trip_id)

@router.post("/autonomy-cycle/run")
async def trigger_manual_autonomy_cycle(
    trip_id: UUID,
    driver_id: UUID,
    vehicle_id: UUID,
    db: AsyncSession = Depends(get_db),
    redis_client: aioredis.Redis = Depends(get_redis)
):
    """
    Trigger the GAURDIAN autonomy perception & reasoning loop out-of-band for testing.
    Normally this executes inside the WebSocket telemetry channel.
    """
    workflow = GAURDIANAgentWorkflow(db, redis_client)
    res = await workflow.execute_autonomy_cycle(trip_id, driver_id, vehicle_id)
    return {"status": "SUCCESS", "results": res}
