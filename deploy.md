# 🛡️ AI GUARDIAN OS — Enterprise Operations & Runbook

This operations guide outlines the production deployment, infrastructure architecture, environment configurations, and backup routines for **AI GUARDIAN OS**.

---

## 🏗️ 1. Infrastructure Overview

```mermaid
graph TD
  User([Driver / Auditor]) -->|HTTPS / WSS| CDN[Cloudflare CDN]
  CDN -->|Static Assets| S3[AWS S3 Bucket]
  CDN -->|API Requests| ALB[AWS Application Load Balancer]
  ALB -->|Route Auth| ECS_F[ECS Frontend Tasks]
  ALB -->|Route Telemetry| ECS_B[ECS FastAPI Backend Tasks]
  ECS_B -->|State Cache| Redis[(Redis Cache / WS State)]
  ECS_B -->|Persistent DB| RDS[(RDS PostgreSQL Database)]
```

---

## ⚙️ 2. Environment Schema Configuration

### Frontend Configurations (`frontend-next/.env.production`)
```env
NEXT_PUBLIC_API_URL=https://api.guardian.ai/api/v1
NEXT_PUBLIC_WS_URL=wss://api.guardian.ai/api/v1/telemetry/ws
```

### Backend Configurations (`.env`)
```env
DATABASE_URL=postgresql://postgres:securepassword@rds.guardian.ai:5432/guardian_db
REDIS_URL=redis://redis.guardian.ai:6379/0
JWT_SECRET_KEY=super_secure_jwt_secret_key_guard_os_984
```

---

## 💾 3. Backups & Recovery Procedures

### Database Backups (AWS RDS Automated)
* **Frequency**: Automated daily snapshot at 03:00 UTC.
* **Retention**: 30-day point-in-time recovery window.
* **Manual Trigger**:
  ```bash
  aws rds create-db-snapshot --db-instance-identifier guardian-db-prod --db-snapshot-identifier guardian-db-manual-snap
  ```

### Disaster Recovery Triage
1. **DB Outage**: Promotes Read-Replica to Primary using AWS RDS Failover Console.
2. **WebSocket Telemetry Interruption**: Frontend client auto-detects socket status, starts exponential backoff reconnection, and switches to cached digital twin mode dynamically.
3. **MFA Key Loss**: Administrators execute backup recovery key verification code procedure inside the Admin Console.
