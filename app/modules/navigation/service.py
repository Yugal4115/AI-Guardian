from uuid import UUID
from datetime import datetime, timedelta, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.modules.navigation.models import NavigationRoute
from app.modules.schemas import NavigationRouteCreate
from app.exceptions import NotFoundException

class NavigationService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_route(self, route_id: UUID) -> NavigationRoute:
        result = await self.db.execute(select(NavigationRoute).filter(NavigationRoute.id == route_id))
        route = result.scalars().first()
        if not route:
            raise NotFoundException("Route not found")
        return route

    async def create_route(self, route_in: NavigationRouteCreate) -> NavigationRoute:
        db_obj = NavigationRoute(**route_in.model_dump())
        self.db.add(db_obj)
        await self.db.flush()
        return db_obj

    async def generate_optimized_route(self, trip_id: UUID, origin: str, destination: str, optimization: str = "MAX_SAFETY") -> NavigationRoute:
        # Mock coordinates
        geojson_line = {
            "type": "LineString",
            "coordinates": [[-73.935242, 40.730610], [-73.940000, 40.740000]]
        }
        
        now = datetime.now(timezone.utc)
        eta_low = now + timedelta(minutes=28)
        eta_high = now + timedelta(minutes=35)
        
        route_data = NavigationRouteCreate(
            trip_id=trip_id,
            path_coordinates=geojson_line,
            eta_confidence_low=eta_low,
            eta_confidence_high=eta_high,
            estimated_duration=1800.0,
            hazard_score=15.0 if optimization == "MAX_SAFETY" else 35.0,
            optimization_type=optimization
        )
        return await self.create_route(route_data)
