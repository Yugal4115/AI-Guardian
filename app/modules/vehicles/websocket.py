import json
import logging
from typing import Dict, List, Any
from uuid import UUID
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
import redis.asyncio as aioredis
from app.database import get_db, SessionLocal
from app.redis import get_redis, redis_pool
from app.modules.schemas import TelemetryCreate
from app.modules.vehicles.service import VehicleService
from app.modules.trips.service import TripService
from app.modules.ai.workflow import GAURDIANAgentWorkflow

logger = logging.getLogger("gaurdian.vehicles.websocket")
router = APIRouter(tags=["Telemetry WebSocket"])

class WebSocketConnectionManager:
    def __init__(self):
        # Maps active trip_id to WebSocket connections
        self.active_connections: Dict[str, WebSocket] = {}

    async def connect(self, trip_id: str, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[trip_id] = websocket
        logger.info(f"WebSocket connected for Trip ID: {trip_id}")

    def disconnect(self, trip_id: str):
        if trip_id in self.active_connections:
            del self.active_connections[trip_id]
            logger.info(f"WebSocket disconnected for Trip ID: {trip_id}")

    async def send_personal_message(self, message: Dict[str, Any], trip_id: str):
        websocket = self.active_connections.get(trip_id)
        if websocket:
            await websocket.send_json(message)

    async def broadcast(self, message: Dict[str, Any]):
        for trip_id, connection in self.active_connections.items():
            try:
                await connection.send_json(message)
            except Exception as e:
                logger.error(f"Error broadcasting to trip {trip_id}: {str(e)}")

ws_manager = WebSocketConnectionManager()

@router.websocket("/telemetry/ws")
async def telemetry_websocket_endpoint(
    websocket: WebSocket,
    trip_id: UUID = Query(..., description="Active Trip UUID"),
    driver_id: UUID = Query(..., description="Active Driver UUID"),
    vehicle_id: UUID = Query(..., description="Active Vehicle UUID")
):
    await ws_manager.connect(str(trip_id), websocket)
    
    # Initialize standard agent services per connection context
    async with SessionLocal() as db:
        vehicle_service = VehicleService(db)
        redis_client = None
        async for client in get_redis():
            redis_client = client
            break
        
        try:
            while True:
                # Receive real-time telemetry updates (JSON format)
                data = await websocket.receive_text()
                payload = json.loads(data)
                
                # Parse and validate incoming metrics
                telemetry_in = TelemetryCreate(**payload)
                
                # 1. Log Telemetry to database asynchronously
                await vehicle_service.log_telemetry(vehicle_id, telemetry_in)
                
                # 2. Run active GAURDIAN autonomy perception & reasoning engine loop
                workflow = GAURDIANAgentWorkflow(db, redis_client)
                
                # Broadcast callback allows workflow steps to transmit alerts directly over active WS
                async def ws_broadcast(alert_msg):
                    await ws_manager.send_personal_message(alert_msg, str(trip_id))
                    
                result = await workflow.execute_autonomy_cycle(
                    trip_id=trip_id,
                    driver_id=driver_id,
                    vehicle_id=vehicle_id,
                    ws_broadcast_func=ws_broadcast
                )
                
                # Send confirmation status report back to the vehicle edge client
                await websocket.send_json({
                    "status": "TELEMETRY_PROCESSED",
                    "timestamp": telemetry_in.speed,
                    "cycle_result": {
                        "risk_score": result["risk_score"],
                        "decision_status": result["status"],
                        "actions": result["actions_executed"]
                    }
                })
                
        except WebSocketDisconnect:
            ws_manager.disconnect(str(trip_id))
        except Exception as e:
            logger.error(f"Error handling WebSocket session: {str(e)}")
            ws_manager.disconnect(str(trip_id))
            await websocket.close()
        finally:
            await redis_client.close()
