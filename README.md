# 🚀 GAURDIAN AI Guardian Backend (v2.0 Enterprise)

GAURDIAN AI Guardian is an enterprise-grade, fully agentic AI platform backend for autonomous vehicle intelligence and safety. It acts as an active digital co-pilot, orchestrating real-time perception, threat reasoning, priority planning, safety-guarded executions, and reflective learning.

---

## 🛠️ Technology Stack
*   **Core**: Python 3.12, FastAPI, AsyncIO
*   **Database & Persistence**: PostgreSQL (SQLAlchemy 2.0, Alembic migrations)
*   **Caching & L1 Memory**: Redis (aioredis connection pools)
*   **Security & RBAC**: PyJWT, bcrypt, Role-based Route Decorators
*   **Real-time Communication**: WebSockets, Async Event Bus
*   **Testing**: pytest, pytest-asyncio, httpx
*   **Containerization**: Docker, Docker Compose

---

## 📂 Modular Feature Clean Architecture

The codebase is organized into cohesive feature modules separating models, request schemas, persistence layers (Repositories), and business logic rules (Services):

*   `app/core/`: Global utility components (JWT authorization, async event bus, background tasks, notifications).
*   `app/modules/`: Business logic divided by domain:
    *   `auth/` & `users/`: Authentication, credentials validation, and profile management.
    *   `drivers/` & `vehicles/`: Behavior fatigue logging, vehicle digital twins, and sensor streams.
    *   `trips/` & `navigation/`: Driving sessions, eta estimations, path geometries, and optimized routes.
    *   `weather/` & `safety/` & `emergency/`: Traction coefficients, hazard alerts, collision risk, and SOS emergency triage.
    *   `maintenance/`: Component Remaining Useful Life (RUL) and parts pre-ordering cost-benefit checks.
    *   `ai/`: GAURDIAN Autonomy Loop (Context Manager, Memory cache/embeddings storage, Reasoning attributions, Priority Planning, Actions Execution, and Feedback Reflection).

---

## 🚀 Quick Start Guide

### Prerequisites
*   Docker & Docker Compose installed
*   Python 3.12+ (if running locally without Docker)
*   Poetry package manager (optional for local dependency resolution)

### Step 1: Clone and Configure Environments
Copy the environment variables template and initialize settings:
```bash
cp .env.example .env
```

### Step 2: Spin Up Containers using Docker Compose
This command spins up the database, cache pools, runs DB migrations, and launches the application:
```bash
docker-compose up --build
```
The server will bind and expose port **8000** locally.

### Step 3: Access API Documentation
Once running, open the interactive Swagger docs in your browser:
*   Swagger UI: [http://localhost:8000/api/v1/docs](http://localhost:8000/api/v1/docs)
*   ReDoc UI: [http://localhost:8000/api/v1/redoc](http://localhost:8000/api/v1/redoc)

---

## ⚡ WebSocket Telemetry Ingestion API

To push real-time sensor metrics and trigger the AI Autonomy Loop, establish a WebSocket connection:

**Endpoint**:
`ws://localhost:8000/api/v1/telemetry/ws?trip_id={trip_id}&driver_id={driver_id}&vehicle_id={vehicle_id}`

### Telemetry Payload Example (JSON)
Send high-frequency logs to the socket:
```json
{
  "speed": 75.0,
  "rpm": 2200.0,
  "throttle": 0.45,
  "battery_soc": 82.5,
  "battery_temp": 32.0,
  "brake_pressure": 0.0,
  "latitude": 40.730610,
  "longitude": -73.935242,
  "elevation": 12.0,
  "imu_accel_x": 0.02,
  "imu_accel_y": -0.01,
  "imu_accel_z": 9.81,
  "roll": 0.0,
  "pitch": 1.2,
  "yaw": -45.0
}
```

### WebSocket Response Example
The client receives live confirmation of threat analysis:
```json
{
  "status": "TELEMETRY_PROCESSED",
  "cycle_result": {
    "risk_score": 42.5,
    "decision_status": "PENDING_DRIVER",
    "actions": "SUGGEST_COACHING"
  }
}
```
*Note: If risk thresholds are exceeded, the WebSocket channel automatically pushes Cabin Warnings (`CABIN_ALERT` or `COACHING_PROMPT`) back to the client.*

---

## 🧪 Testing

Execute automated unit and integration tests locally:
```bash
pytest
```
Tests run inside a sandboxed in-memory SQLite setup using async clients.
