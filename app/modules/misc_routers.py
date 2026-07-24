from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.modules.navigation.service import NavigationService
from app.modules.weather.service import WeatherService
from app.modules.safety.service import SafetyService
from app.modules.emergency.service import EmergencyService
from app.modules.notifications.service import NotificationService
from app.modules.reports.service import ReportService
from app.modules.settings.service import SettingsService
from app.modules.schemas import (
    NavigationRouteResponse,
    NavigationRouteCreate,
    WeatherImpactLogResponse,
    WeatherImpactLogCreate,
    SafetyRiskResponse,
    SafetyRiskCreate,
    EmergencyIncidentResponse,
    EmergencyIncidentCreate,
    NotificationResponse,
    ReportResponse,
    SettingsResponse,
    SettingsCreate
)

router = APIRouter()

# --- Navigation ---
@router.post("/navigation/routes", response_model=NavigationRouteResponse, status_code=status.HTTP_201_CREATED, tags=["Navigation"])
async def create_navigation_route(
    route_in: NavigationRouteCreate,
    db: AsyncSession = Depends(get_db)
):
    service = NavigationService(db)
    return await service.create_route(route_in)

@router.post("/navigation/routes/optimize", response_model=NavigationRouteResponse, tags=["Navigation"])
async def optimize_navigation_route(
    trip_id: UUID,
    origin: str,
    destination: str,
    optimization: str = "MAX_SAFETY",
    db: AsyncSession = Depends(get_db)
):
    service = NavigationService(db)
    return await service.generate_optimized_route(trip_id, origin, destination, optimization)

# --- Weather ---
@router.post("/weather/logs", response_model=WeatherImpactLogResponse, status_code=status.HTTP_201_CREATED, tags=["Weather"])
async def log_weather_impact(
    weather_in: WeatherImpactLogCreate,
    db: AsyncSession = Depends(get_db)
):
    service = WeatherService(db)
    return await service.log_weather(weather_in)

@router.get("/weather/latest", response_model=WeatherImpactLogResponse, tags=["Weather"])
async def get_latest_weather_conditions(
    db: AsyncSession = Depends(get_db)
):
    service = WeatherService(db)
    weather = await service.get_latest_weather()
    if not weather:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="No weather logs available")
    return weather

# --- Safety ---
@router.post("/safety/risks", response_model=SafetyRiskResponse, status_code=status.HTTP_201_CREATED, tags=["Safety"])
async def log_safety_risk(
    risk_in: SafetyRiskCreate,
    db: AsyncSession = Depends(get_db)
):
    service = SafetyService(db)
    return await service.log_risk(risk_in)

@router.get("/safety/risks/vehicles/{vehicle_id}", response_model=List[SafetyRiskResponse], tags=["Safety"])
async def list_vehicle_safety_risks(
    vehicle_id: UUID,
    limit: int = 10,
    db: AsyncSession = Depends(get_db)
):
    service = SafetyService(db)
    return await service.get_latest_risks(vehicle_id, limit)

@router.post("/safety/near-misses", tags=["Safety"])
async def record_near_miss_incident(
    vehicle_id: UUID,
    severity: float = Query(..., description="Risk severity 0 to 1"),
    description: str = Query(...),
    db: AsyncSession = Depends(get_db)
):
    service = SafetyService(db)
    return await service.record_near_miss(vehicle_id, severity, description)

# --- Emergency ---
@router.post("/emergency/incidents", response_model=EmergencyIncidentResponse, status_code=status.HTTP_201_CREATED, tags=["Emergency"])
async def trigger_emergency_incident(
    incident_in: EmergencyIncidentCreate,
    db: AsyncSession = Depends(get_db)
):
    service = EmergencyService(db)
    return await service.trigger_emergency(incident_in)

@router.get("/emergency/incidents/{incident_id}", response_model=EmergencyIncidentResponse, tags=["Emergency"])
async def get_emergency_incident(
    incident_id: UUID,
    db: AsyncSession = Depends(get_db)
):
    service = EmergencyService(db)
    return await service.get_incident(incident_id)

# --- Notifications ---
@router.get("/notifications/recipients/{recipient_id}", response_model=List[NotificationResponse], tags=["Notifications"])
async def get_recipient_notifications(
    recipient_id: UUID,
    limit: int = 50,
    db: AsyncSession = Depends(get_db)
):
    service = NotificationService(db)
    return await service.get_by_recipient(recipient_id, limit)

@router.post("/notifications/{notification_id}/read", tags=["Notifications"])
async def mark_notification_read(
    notification_id: UUID,
    db: AsyncSession = Depends(get_db)
):
    service = NotificationService(db)
    success = await service.mark_as_read(notification_id)
    return {"status": "SUCCESS" if success else "FAILED"}

# --- Reports ---
@router.post("/reports", response_model=ReportResponse, status_code=status.HTTP_201_CREATED, tags=["Reports"])
async def generate_pdf_report(
    title: str,
    report_type: str,
    user_id: UUID,
    filters: dict = None,
    db: AsyncSession = Depends(get_db)
):
    service = ReportService(db)
    return await service.generate_report(title, report_type, user_id, filters or {})

@router.get("/reports/users/{user_id}", response_model=List[ReportResponse], tags=["Reports"])
async def list_user_generated_reports(
    user_id: UUID,
    db: AsyncSession = Depends(get_db)
):
    service = ReportService(db)
    return await service.list_reports(user_id)

# --- Settings ---
@router.post("/settings", response_model=SettingsResponse, tags=["Settings"])
async def save_system_settings(
    settings_in: SettingsCreate,
    db: AsyncSession = Depends(get_db)
):
    service = SettingsService(db)
    return await service.save_settings(settings_in)

@router.get("/settings", response_model=SettingsResponse, tags=["Settings"])
async def get_system_settings(
    owner_id: str = "global",
    key: str = "general",
    db: AsyncSession = Depends(get_db)
):
    service = SettingsService(db)
    settings = await service.get_settings(owner_id, key)
    if not settings:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Settings key not found")
    return settings
