# 🛡️ AI GUARDIAN OS — Master Testing, QA, & Deployment Playbook

This document serves as the enterprise Quality Assurance (QA), testing, observability, and deployment playbook for **AI GUARDIAN OS**.

---

## 🧪 1. Testing Architecture Overview

| Testing Layer | Scope & Target Components | Tooling / Strategy |
| :--- | :--- | :--- |
| **Unit Testing** | Utilities, Stores (`useAuthStore`, `useVehicleStore`), Formatters | Jest / React Testing Library |
| **Component Testing** | Buttons, GlassCard, Sidebar, TopNavbar, Gauges | Component Harness |
| **3D Canvas Testing** | R3F Exploded View, 6 Digital Twin Modes | WebGL 60 FPS Target Verification |
| **Real-time WebSockets** | Telemetry Stream (`ws://localhost:8000/api/v1/telemetry/ws`) | Reconnect & Heartbeat Verification |
| **E2E Journeys** | Landing → Login → Onboarding Wizard → Dashboard | Playwright / Cypress |
| **Accessibility (a11y)**| Keyboard Navigation (`Tab`, `Enter`, `Esc`, `⌘K`), ARIA Labels | WCAG 2.1 AA Verification |

---

## ⚡ 2. QA Acceptance Checklist

- `[x]` **No Console Errors**: Zero uncaught JavaScript/React exceptions.
- `[x]` **60 FPS Animation Target**: Verified on 3D R3F SUV chassis and SAVIRA 3D Holographic Core.
- `[x]` **Route Guard Integrity**: Unauthenticated users redirected to `/login`; users without a vehicle redirected to `/onboarding`.
- `[x]` **Keyboard Shortcuts**: `Cmd/Ctrl + K` launches Command Palette; `Cmd/Ctrl + /` opens Shortcuts Guide; `Esc` closes active modals.
- `[x]` **Grammar Intelligence**: Analyzes typos (e.g. `"wht is battrey helth"`) and provides live corrected intent badge.
- `[x]` **Domain Limitation Guardrails**: Intercepts non-vehicle queries (e.g. `"Who won IPL?"`) with professional guardrail notice.

---

## 🚀 3. Deployment Readiness Steps

```bash
# 1. Strict TypeScript Verification
npx tsc --noEmit

# 2. Optimized Production Turbopack Build
npm run build

# 3. Start Production Dev Server
npm run dev
```
