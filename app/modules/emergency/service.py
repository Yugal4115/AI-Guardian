from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.modules.emergency.models import EmergencyIncident
from app.modules.schemas import EmergencyIncidentCreate
from app.exceptions import NotFoundException

class EmergencyService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def trigger_emergency(self, incident_in: EmergencyIncidentCreate) -> EmergencyIncident:
        # Business logic: Auto-compile triage steps
        data = incident_in.model_dump()
        
        # Heuristic SOS routing
        nearest_hospital = "St. Jude Trauma Center (1.2 miles)"
        severity = data.get("crash_severity", 0)
        
        data["sos_routing_details"] = {
            "dispatch_ambulance": True if severity >= 2 else False,
            "dispatch_police": True,
            "primary_triage_destination": nearest_hospital,
            "airbag_status": "DEPLOYED" if data.get("is_airbag_deployed") else "CLOSED",
            "impact_vector": f"Angle: {data.get('impact_angle')} degrees | Force: {data.get('impact_force_g')} G"
        }
        
        db_obj = EmergencyIncident(**data)
        self.db.add(db_obj)
        await self.db.flush()
        return db_obj

    async def get_incident(self, incident_id: UUID) -> EmergencyIncident:
        result = await self.db.execute(
            select(EmergencyIncident).filter(EmergencyIncident.id == incident_id)
        )
        obj = result.scalars().first()
        if not obj:
            raise NotFoundException("Emergency incident not found")
        return obj

    async def update_triage_status(self, incident_id: UUID, status: str) -> EmergencyIncident:
        incident = await self.get_incident(incident_id)
        incident.triage_status = status
        self.db.add(incident)
        return incident
