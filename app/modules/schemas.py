from datetime import datetime
from typing import List, Dict, Any, Optional
from uuid import UUID
from pydantic import BaseModel, EmailStr, Field

# --- User & Auth Schemas ---
class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: str = "DRIVER" # ADMIN, FLEET_MANAGER, DRIVER, DISPATCHER

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: UUID
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    username: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# --- Driver Schemas ---
class DriverCreate(BaseModel):
    user_id: UUID
    license_number: str
    experience_years: int = 0
    cognitive_baseline: Dict[str, Any] = Field(default_factory=dict)
    emergency_contact: Dict[str, Any] = Field(default_factory=dict)

class DriverResponse(BaseModel):
    id: UUID
    user_id: UUID
    license_number: str
    experience_years: int
    safety_score: float
    cognitive_baseline: Dict[str, Any]
    emergency_contact: Dict[str, Any]
    is_active_duty: bool
    created_at: datetime

    class Config:
        from_attributes = True

class DriverBehaviorLogCreate(BaseModel):
    fatigue_score: float
    eye_closure_duration: float
    head_angle_deviation: float
    distraction_flag: bool
    stress_level: float

class DriverBehaviorLogResponse(DriverBehaviorLogCreate):
    id: UUID
    driver_id: UUID
    recorded_at: datetime

    class Config:
        from_attributes = True

# --- Vehicle & Telemetry Schemas ---
class VehicleCreate(BaseModel):
    vin: str
    make: str
    model: str
    year: int
    fuel_type: str = "EV" # EV, GASOLINE, DIESEL, HYBRID
    battery_capacity: Optional[float] = None
    fuel_capacity: Optional[float] = None
    digital_twin_metadata: Dict[str, Any] = Field(default_factory=dict)

class VehicleResponse(VehicleCreate):
    id: UUID
    current_status: str
    created_at: datetime

    class Config:
        from_attributes = True

class TelemetryCreate(BaseModel):
    speed: float
    rpm: float
    throttle: float
    fuel_level: Optional[float] = None
    battery_soc: Optional[float] = None
    battery_temp: Optional[float] = None
    transmission_temp: Optional[float] = None
    brake_pressure: float
    coolant_temp: Optional[float] = None
    latitude: float
    longitude: float
    elevation: float = 0.0
    imu_accel_x: float = 0.0
    imu_accel_y: float = 0.0
    imu_accel_z: float = 0.0
    roll: float = 0.0
    pitch: float = 0.0
    yaw: float = 0.0

class TelemetryResponse(TelemetryCreate):
    id: UUID
    vehicle_id: UUID
    timestamp: datetime

    class Config:
        from_attributes = True

# --- Trip & Navigation Schemas ---
class TripCreate(BaseModel):
    driver_id: UUID
    vehicle_id: UUID
    origin_name: str
    destination_name: str
    route_geometry: Dict[str, Any] = Field(default_factory=dict)

class TripResponse(BaseModel):
    id: UUID
    driver_id: UUID
    vehicle_id: UUID
    start_time: datetime
    end_time: Optional[datetime] = None
    origin_name: str
    destination_name: str
    total_distance: float
    total_fuel_consumed: float
    efficiency_score: float
    safety_score: float
    route_geometry: Dict[str, Any]
    created_at: datetime

    class Config:
        from_attributes = True

class NavigationRouteCreate(BaseModel):
    trip_id: UUID
    path_coordinates: Dict[str, Any]
    eta_confidence_low: datetime
    eta_confidence_high: datetime
    estimated_duration: float
    hazard_score: float
    optimization_type: str = "MIN_TIME"

class NavigationRouteResponse(NavigationRouteCreate):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True

# --- Weather Schemas ---
class WeatherImpactLogCreate(BaseModel):
    latitude: float
    longitude: float
    condition: str
    precipitation_rate: float
    visibility: float
    traction_rating: float
    severe_weather_alert: bool

class WeatherImpactLogResponse(WeatherImpactLogCreate):
    id: UUID
    recorded_at: datetime

    class Config:
        from_attributes = True

# --- Safety & Emergency Schemas ---
class SafetyRiskCreate(BaseModel):
    vehicle_id: UUID
    collision_probability: float
    warning_level: str
    threat_details: Dict[str, Any]
    lane_drift_hazard: bool
    following_distance_gap: float

class SafetyRiskResponse(SafetyRiskCreate):
    id: UUID
    recorded_at: datetime

    class Config:
        from_attributes = True

class EmergencyIncidentCreate(BaseModel):
    vehicle_id: UUID
    driver_id: UUID
    crash_severity: int
    impact_angle: float
    impact_force_g: float
    occupant_count: int
    is_airbag_deployed: bool
    triage_status: str = "PENDING"
    sos_routing_details: Dict[str, Any] = Field(default_factory=dict)

class EmergencyIncidentResponse(EmergencyIncidentCreate):
    id: UUID
    recorded_at: datetime

    class Config:
        from_attributes = True

# --- Fleet & Maintenance Schemas ---
class FleetCreate(BaseModel):
    name: str
    description: Optional[str] = None

class FleetResponse(FleetCreate):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True

class MaintenanceTaskCreate(BaseModel):
    vehicle_id: UUID
    component_name: str
    remaining_useful_life_days: float
    estimated_failure_time: datetime
    urgency_score: float
    cost_benefit_analysis: Dict[str, Any] = Field(default_factory=dict)
    parts_preordered: bool = False
    status: str = "PENDING"
    scheduled_at: Optional[datetime] = None

class MaintenanceTaskResponse(MaintenanceTaskCreate):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True

# --- Notifications, Reports, and Settings ---
class NotificationResponse(BaseModel):
    id: UUID
    recipient_id: UUID
    title: str
    description: str
    priority: str
    channel: str
    sent_status: str
    read_at: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True

class ReportResponse(BaseModel):
    id: UUID
    title: str
    type: str
    storage_url: str
    generated_by_id: UUID
    metadata_payload: Dict[str, Any]
    created_at: datetime

    class Config:
        from_attributes = True

class SettingsCreate(BaseModel):
    owner_id: str = "global"
    key: str
    value: Dict[str, Any]

class SettingsResponse(SettingsCreate):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True

# --- Agentic AI Schemas ---
class AIContextResponse(BaseModel):
    id: UUID
    trip_id: UUID
    driver_fatigue_score: float
    road_condition: str
    weather_severity: float
    global_risk_score: float
    active_agent_states: Dict[str, Any]
    recorded_at: datetime

    class Config:
        from_attributes = True

class AIMemoryCreate(BaseModel):
    type: str
    payload: Dict[str, Any]
    vector_embedding: Optional[Dict[str, Any]] = None
    importance_weight: float = 1.0

class AIMemoryResponse(AIMemoryCreate):
    id: UUID
    access_count: int
    last_accessed_at: datetime
    created_at: datetime

    class Config:
        from_attributes = True

class AIDecisionResponse(BaseModel):
    id: UUID
    trip_id: UUID
    reasoning_chain: Dict[str, Any]
    confidence_score: float
    proposed_actions: Dict[str, Any]
    status: str
    action_taken: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class ConversationMessageCreate(BaseModel):
    content: str

class ConversationMessageResponse(BaseModel):
    id: UUID
    session_id: UUID
    role: str
    content: str
    intent_classification: Optional[str] = None
    reasoning_context: Dict[str, Any]
    timestamp: datetime

    class Config:
        from_attributes = True

class ConversationSessionResponse(BaseModel):
    id: UUID
    driver_id: UUID
    started_at: datetime
    ended_at: Optional[datetime] = None

    class Config:
        from_attributes = True
