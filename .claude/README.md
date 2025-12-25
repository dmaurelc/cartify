# 🤖 Sistema de Agentes Claude - PDR

Bienvenido al sistema de agentes para el desarrollo del **PDR - Portal Digital de Restaurantes**. Este directorio contiene la configuración de un meta-agente orquestador y 8 sub-agentes especializados que trabajan conjuntamente para construir la plataforma.

---

## 📚 Estructura de Directorios

```
.claude/
├── agents/
│   ├── meta/
│   │   └── ORCHESTRATOR.md          # 🎯 Meta Agente (coordinador central)
│   │
│   ├── sub-agents/
│   │   ├── FRONTEND_AGENT.md        # 🎨 Interfaces web (Next.js, React)
│   │   ├── BACKEND_AGENT.md         # ⚙️ APIs y lógica (NestJS)
│   │   ├── DATABASE_AGENT.md        # 💾 Persistencia (PostgreSQL)
│   │   ├── AUTH_SECURITY_AGENT.md   # 🔒 Seguridad y compliance
│   │   ├── DEVOPS_AGENT.md          # 🚀 Infraestructura
│   │   ├── INTEGRATION_AGENT.md     # 🔗 Integraciones externas
│   │   ├── TESTING_AGENT.md         # ✅ Aseguramiento de calidad
│   │   └── DOCUMENTATION_AGENT.md   # 📖 Documentación técnica
│   │
│   ├── config/
│   │   └── AGENTS_REGISTRY.md       # 📋 Registro y configuración
│   │
│   └── shared/
│       └── API_SPECIFICATION.md     # 📡 Template de API
│
└── README.md                         # Este archivo
```

---

## 🎯 Meta Agente Orquestador

### Propósito
Coordinador central que:
- Recibe especificaciones y requisitos
- Descompone trabajo en tareas atómicas
- Delega a sub-agentes especializados
- Monitorea progreso
- Integra resultados
- Asegura calidad

📄 **Completa documentación:** [ORCHESTRATOR.md](agents/meta/ORCHESTRATOR.md)

---

## 🤖 Sub-Agentes Especializados

### 1. 🎨 Frontend Agent
Desarrollo de interfaces web con Next.js, React y Tailwind CSS.

**Responsabilidades:**
- Landing page de ventas
- Carta digital pública
- Dashboards administrativos
- UX/UI y accesibilidad
- Testing de componentes

**Stack:** Next.js, React, TypeScript, Tailwind, Cypress

📄 [FRONTEND_AGENT.md](agents/sub-agents/FRONTEND_AGENT.md)

---

### 2. ⚙️ Backend Agent
APIs REST y lógica de negocio con NestJS.

**Responsabilidades:**
- Microservicios NestJS
- Validaciones Zod
- Lógica de dominio
- Transacciones ACID
- Manejo de errores

**Stack:** NestJS, Node.js, TypeScript, Prisma, JWT

📄 [BACKEND_AGENT.md](agents/sub-agents/BACKEND_AGENT.md)

---

### 3. 💾 Database Agent
Persistencia de datos con PostgreSQL.

**Responsabilidades:**
- Diseño de esquema
- Migrations con Prisma
- Optimización de queries
- Índices y performance
- Multi-tenancy

**Stack:** PostgreSQL, Prisma ORM, Redis

📄 [DATABASE_AGENT.md](agents/sub-agents/DATABASE_AGENT.md)

---

### 4. 🔒 Auth & Security Agent
Autenticación, autorización y seguridad.

**Responsabilidades:**
- Autenticación JWT/OAuth
- RBAC (Role-Based Access Control)
- Encriptación y hashing
- Compliance (OWASP, RGPD, PCI-DSS)
- Auditoría

**Stack:** JWT, Bcrypt, OAuth 2.0, Helmet, Rate Limiting

📄 [AUTH_SECURITY_AGENT.md](agents/sub-agents/AUTH_SECURITY_AGENT.md)

---

### 5. 🚀 DevOps Agent
Infraestructura, deployment y operaciones.

**Responsabilidades:**
- Docker y Kubernetes
- CI/CD pipelines
- Monitoreo y alertas
- Scaling automático
- Disaster recovery

**Stack:** Docker, Kubernetes, GitHub Actions, Prometheus, Grafana

📄 [DEVOPS_AGENT.md](agents/sub-agents/DEVOPS_AGENT.md)

---

### 6. 🔗 Integration Agent
Integraciones con servicios externos.

**Responsabilidades:**
- Pasarelas de pago (Webpay, Stripe)
- Email/SMS (SendGrid, Twilio)
- Almacenamiento (S3, Minio)
- APIs externas
- Webhook handling

**Stack:** Webpay, Stripe, SendGrid, Twilio, AWS SDK

📄 [INTEGRATION_AGENT.md](agents/sub-agents/INTEGRATION_AGENT.md)

---

### 7. ✅ Testing Agent
Aseguramiento de calidad.

**Responsabilidades:**
- Tests unitarios (>80% coverage)
- Tests de integración
- Tests E2E
- Load testing
- Security testing

**Stack:** Jest, Cypress, k6, OWASP ZAP, Supertest

📄 [TESTING_AGENT.md](agents/sub-agents/TESTING_AGENT.md)

---

### 8. 📖 Documentation Agent
Documentación técnica.

**Responsabilidades:**
- API documentation (OpenAPI)
- Architecture documentation
- Developer guides
- Deployment guides
- User documentation

**Stack:** OpenAPI/Swagger, MkDocs, PlantUML, Markdown

📄 [DOCUMENTATION_AGENT.md](agents/sub-agents/DOCUMENTATION_AGENT.md)

---

## 🔄 Flujo de Trabajo

```
┌─────────────────────────────────────────┐
│     Especificación de Requisito         │
└────────────────┬────────────────────────┘
                 │
                 ▼
      ┌──────────────────────┐
      │ Meta Orchestrator    │
      │ - Análisis           │
      │ - Descomposición     │
      │ - Planificación      │
      └──────────┬───────────┘
                 │
      ┌──────────┴───────────┐
      │                      │
      ▼                      ▼
   Sub-Agent 1           Sub-Agent 2
   (Frontend)            (Backend)
      │                      │
      ▼                      ▼
   Implementa             Implementa
      │                      │
      └──────────┬───────────┘
                 │
                 ▼
      ┌──────────────────────┐
      │  Testing Agent       │
      │  - Unit tests        │
      │  - Integration tests │
      │  - E2E tests         │
      └──────────┬───────────┘
                 │
                 ▼
      ┌──────────────────────┐
      │ Meta Orchestrator    │
      │ - Validación         │
      │ - Integración        │
      │ - Documentación      │
      └──────────┬───────────┘
                 │
                 ▼
            Release
```

---

## 📋 Matriz de Responsabilidades

| Módulo | Frontend | Backend | DB | Auth | DevOps | Integration | Testing | Docs |
|--------|----------|---------|----|----|--------|-------------|---------|------|
| Landing | Lead | Support | Support | - | Support | - | Test | Doc |
| Carta Digital | Lead | Lead | Lead | Support | Support | Lead | Test | Doc |
| Gestión Admin | Lead | Lead | Lead | Lead | Support | Support | Test | Doc |
| Super Admin | Lead | Lead | Lead | Lead | Support | Support | Test | Doc |
| Auth | Support | Lead | Lead | Lead | Support | Lead | Test | Doc |
| Payments | Support | Lead | Lead | Lead | Support | Lead | Test | Doc |
| Infra | - | Support | Support | Support | Lead | Support | Test | Doc |

---

## 🚀 Comenzando

### Requisitos Previos
- Node.js 20+
- Docker & Docker Compose
- Git
- Claude Code (extensión VS Code)

### Pasos Iniciales

#### 1. Leer Documentación
Comienza por estas lecturas:
1. Este README
2. [ORCHESTRATOR.md](agents/meta/ORCHESTRATOR.md) - Entender orquestación
3. [AGENTS_REGISTRY.md](agents/config/AGENTS_REGISTRY.md) - Registro de agentes
4. [PROJECT_PLAN.md](../docs/PROJECT_PLAN.md) - Plan del proyecto
5. [ROADMAP.md](../docs/ROADMAP.md) - Timeline

#### 2. Revisar Agent Específico
Según tu rol, lee el agent correspondiente:
- Frontend: [FRONTEND_AGENT.md](agents/sub-agents/FRONTEND_AGENT.md)
- Backend: [BACKEND_AGENT.md](agents/sub-agents/BACKEND_AGENT.md)
- Database: [DATABASE_AGENT.md](agents/sub-agents/DATABASE_AGENT.md)
- Etc.

#### 3. Esperar Asignación del Orchestrator
El Meta Orchestrator asignará tareas específicas cuando comience Phase 1.

### Comunicación Inter-Agentes

Cada agent tiene definida:
- Qué requiere de otros agents
- Qué proporciona a otros agents
- Formato de comunicación
- Protocolo de escalación

Revisar sección "Comunicación con Otros Agentes" en cada document.

---

## 📞 Comunicación y Escalación

### Niveles de Escalación

#### Nivel 1: Intra-Agent
Sub-agent resuelve dentro de su especialidad

#### Nivel 2: Inter-Agent
Meta Orchestrator coordina múltiples sub-agents

#### Nivel 3: Architectural
Meta Orchestrator decide cambio arquitectónico

#### Nivel 4: Strategic
Stakeholder aprueba decisión de proyecto

### Reportes de Progreso

Cada sub-agent reporta al Meta Orchestrator:
- **Diario:** Status update breve
- **Semanal:** Progreso detallado + blockers
- **Sprint:** Completitud de tareas + lecciones aprendidas

---

## 📊 Status Actual

| Componente | Status | Detalles |
|-----------|--------|---------|
| Meta Orchestrator | 🟢 Activo | Coordinando |
| Frontend Agent | 🟢 Ready | Esperando tareas |
| Backend Agent | 🟢 Ready | Esperando tareas |
| Database Agent | 🟢 Ready | Esperando tareas |
| Auth Agent | 🟢 Ready | Esperando tareas |
| DevOps Agent | 🟢 Ready | Esperando tareas |
| Integration Agent | 🟢 Ready | Esperando tareas |
| Testing Agent | 🟢 Ready | Esperando tareas |
| Documentation Agent | 🟢 Ready | Esperando tareas |

---

## 🎯 Próximos Pasos

1. ✅ Sistema de agentes creado
2. ⏳ Validación con stakeholders
3. ⏳ Inicio de Phase 1 (Semana 1)
4. ⏳ Asignación de tareas por sprint
5. ⏳ Desarrollo coordinado

---

## 📚 Recursos

### Documentación Principal
- [PROJECT_PLAN.md](../docs/PROJECT_PLAN.md) - Plan estratégico
- [ROADMAP.md](../docs/ROADMAP.md) - Timeline de releases
- [CHANGELOG.md](../docs/CHANGELOG.md) - Historial de cambios
- [IDEAS.md](../docs/IDEAS.md) - Ideas board

### Especificaciones
- [PDR_Portal_Restaurantes.md](../PDR_Portal_Restaurantes.md) - Especificaciones completas
- [API_SPECIFICATION.md](shared/API_SPECIFICATION.md) - Template API
- [AGENTS_REGISTRY.md](config/AGENTS_REGISTRY.md) - Registro de agentes

### Agentes
- [Meta Orchestrator](agents/meta/ORCHESTRATOR.md)
- [Frontend Agent](agents/sub-agents/FRONTEND_AGENT.md)
- [Backend Agent](agents/sub-agents/BACKEND_AGENT.md)
- [Database Agent](agents/sub-agents/DATABASE_AGENT.md)
- [Auth & Security Agent](agents/sub-agents/AUTH_SECURITY_AGENT.md)
- [DevOps Agent](agents/sub-agents/DEVOPS_AGENT.md)
- [Integration Agent](agents/sub-agents/INTEGRATION_AGENT.md)
- [Testing Agent](agents/sub-agents/TESTING_AGENT.md)
- [Documentation Agent](agents/sub-agents/DOCUMENTATION_AGENT.md)

---

## 🤝 Contribución y Feedback

Si eres parte del equipo de desarrollo:
1. Revisa el agent correspondiente a tu especialidad
2. Espera asignación del Meta Orchestrator
3. Sigue el protocolo de comunicación definido
4. Reporta progreso regularmente
5. Mantén documentación actualizada

---

## ⚙️ Stack Tecnológico (Resumen)

### Frontend
- Next.js 14+, React 18+, TypeScript, Tailwind CSS

### Backend
- NestJS, Node.js 20+, TypeScript, Prisma

### Database
- PostgreSQL, Prisma ORM, Redis

### Infrastructure
- Docker, Kubernetes, GitHub Actions

### Security
- JWT, Bcrypt, OAuth 2.0

### Testing
- Jest, Cypress, k6, OWASP ZAP

### Tools
- VS Code + Extensions, Git, npm

---

## 📝 Versión

- **Version:** 1.0
- **Última Actualización:** 2025-12-25
- **Status:** 🟢 Activo
- **Próxima Revisión:** Cuando comience Phase 1

---

## 🔗 Links Rápidos

```
Sistema de Agentes:      .claude/agents/
Documentación Principal: ../docs/
Especificaciones:        ../PDR_Portal_Restaurantes.md
```

---

**Bienvenido al sistema de agentes de PDR. ¡Vamos a construir algo extraordinario!** 🚀
