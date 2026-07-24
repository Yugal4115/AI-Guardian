# Import all models to ensure they register on Base.metadata for Alembic migrations
from app.database import Base
from app.modules.base_models import AuditModel
from app.modules.users.models import User
from app.modules.drivers.models import Driver, DriverBehavioralLog
from app.modules.fleet.models import Fleet, fleet_vehicle_association, fleet_driver_association
from app.modules.vehicles.models import Vehicle, TelemetryLog
from app.modules.trips.models import Trip
from app.modules.navigation.models import NavigationRoute
from app.modules.weather.models import WeatherImpactLog
from app.modules.safety.models import SafetyRisk, NearMissIncident
from app.modules.emergency.models import EmergencyIncident
from app.modules.maintenance.models import MaintenanceTask
from app.modules.notifications.models import Notification
from app.modules.reports.models import Report
from app.modules.settings.models import Settings
from app.modules.ai.models import AIContext, AIMemory, AIDecision, ConversationSession, ConversationMessage

__all__ = [
    "Base",
    "AuditModel",
    "User",
    "Driver",
    "DriverBehavioralLog",
    "Fleet",
    "fleet_vehicle_association",
    "fleet_driver_association",
    "Vehicle",
    "TelemetryLog",
    "Trip",
    "NavigationRoute",
    "WeatherImpactLog",
    "SafetyRisk",
    "NearMissIncident",
    "EmergencyIncident",
    "MaintenanceTask",
    "Notification",
    "Report",
    "Settings",
    "AIContext",
    "AIMemory",
    "AIDecision",
    "ConversationSession",
    "ConversationMessage"
]
