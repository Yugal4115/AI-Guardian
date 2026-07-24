import logging
from fastapi import FastAPI, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
import redis.asyncio as aioredis

from app.config import settings
from app.database import get_db, engine, Base
from app.redis import get_redis, redis_pool
from app.exceptions import register_exception_handlers
from app.middleware import register_middleware, logger

# Import Module Routers
from app.modules.auth.router import router as auth_router
from app.modules.users.router import router as users_router
from app.modules.drivers.router import router as drivers_router
from app.modules.vehicles.router import router as vehicles_router
from app.modules.trips.router import router as trips_router
from app.modules.fleet.router import router as fleet_router
from app.modules.maintenance.router import router as maintenance_router
from app.modules.ai.router import router as ai_router
from app.modules.misc_routers import router as misc_router
from app.modules.vehicles.websocket import router as ws_router

# Configure logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("gaurdian.main")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="2.0.0",
    description="Enterprise-Grade Fully Agentic AI Platform for Autonomous Vehicle Intelligence & Safety",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
    redoc_url=f"{settings.API_V1_STR}/redoc"
)

# Set up CORS Origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.BACKEND_CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Register Custom Exception Hooks & Middleware Layers
register_exception_handlers(app)
register_middleware(app)

# Include Module Routers
from fastapi.staticfiles import StaticFiles

app.include_router(auth_router, prefix=f"{settings.API_V1_STR}/auth")
app.include_router(users_router, prefix=f"{settings.API_V1_STR}/users")
app.include_router(drivers_router, prefix=f"{settings.API_V1_STR}/drivers")
app.include_router(vehicles_router, prefix=f"{settings.API_V1_STR}/vehicles")
app.include_router(trips_router, prefix=f"{settings.API_V1_STR}/trips")
app.include_router(fleet_router, prefix=f"{settings.API_V1_STR}/fleets")
app.include_router(maintenance_router, prefix=f"{settings.API_V1_STR}/maintenance")
app.include_router(ai_router, prefix=f"{settings.API_V1_STR}/ai")
app.include_router(misc_router, prefix=settings.API_V1_STR)
app.include_router(ws_router, prefix=settings.API_V1_STR)

# Serve Frontend static assets
app.mount("/ui", StaticFiles(directory="frontend", html=True), name="ui")

# --- Life Cycle Handlers ---
@app.on_event("startup")
async def startup_event():
    logger.info("Initializing GAURDIAN AI Guardian services...")
    
    # 1. Verify database engine connectivity & build schema if SQLite
    try:
        if settings.DATABASE_URL.startswith("sqlite"):
            async with engine.begin() as conn:
                await conn.run_sync(Base.metadata.create_all)
            logger.info("SQLite database tables created successfully.")
        else:
            async with engine.connect() as conn:
                await conn.execute("SELECT 1")
            logger.info("PostgreSQL Database connection established successfully.")
    except Exception as e:
        logger.critical(f"Failed to connect/initialize Database: {str(e)}")

    # 2. Verify Redis pool connectivity
    try:
        redis_client = aioredis.Redis(connection_pool=redis_pool)
        await redis_client.ping()
        await redis_client.close()
        logger.info("Redis cache pool connection established successfully.")
    except Exception as e:
        logger.critical(f"Failed to connect to Redis: {str(e)}")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Shutting down background workers and connection pools...")
    await engine.dispose()
    await redis_pool.disconnect()

# --- Health Endpoint ---
@app.get("/health", status_code=status.HTTP_200_OK, tags=["System Health"])
async def system_health_check(
    db: AsyncSession = Depends(get_db),
    redis_client: aioredis.Redis = Depends(get_redis)
):
    postgres_ok = False
    redis_ok = False
    
    try:
        await db.execute("SELECT 1")
        postgres_ok = True
    except Exception:
        pass
        
    try:
        await redis_client.ping()
        redis_ok = True
    except Exception:
        pass
        
    status_str = "healthy" if postgres_ok and redis_ok else "degraded"
    return {
        "status": status_str,
        "services": {
            "postgres": "UP" if postgres_ok else "DOWN",
            "redis": "UP" if redis_ok else "DOWN"
        }
    }
