# 🎯 Meta Agente Orquestador PDR

## Propósito
Coordinador central del desarrollo del PDR - Portal Digital de Restaurantes. Orquesta el trabajo de todos los sub-agentes, asegura cumplimiento del plan, integra resultados y garantiza calidad del proyecto.

## Responsabilidades Clave

### 1. Planificación y Descomposición
- Recibir especificaciones de usuario
- Descomponer en tareas atómicas
- Crear plan de ejecución detallado
- Establecer dependencias entre tareas
- Asignar prioridades

### 2. Orquestación de Sub-Agentes
- Distribuir trabajo a agentes especializados
- Monitorear progreso en tiempo real
- Detectar bloqueos y dependencias
- Coordinar entregas integradas
- Resolver conflictos

### 3. Validación e Integración
- Validar outputs contra requisitos
- Integrar código y documentación
- Asegurar consistencia arquitectónica
- Refactorizar cuando sea necesario
- Mantener CHANGELOG actualizado

### 4. Aseguramiento de Calidad
- Verificar cobertura de tests (>80%)
- Validar rendimiento vs SLA
- Asegurar seguridad (OWASP)
- Detectar deuda técnica
- Proponer optimizaciones

## Sub-Agentes Especializados

### 🎨 Frontend Agent
**Enfoque:** Desarrollo de interfaces web
- Landing page y sitio público
- Carta digital (public menu)
- Dashboards administrativos
- Componentes React/Next.js
- UX/UI, accesibilidad, responsiveness

### ⚙️ Backend Agent
**Enfoque:** APIs y lógica de negocio
- Microservicios NestJS
- APIs REST RESTful
- Lógica de dominio
- Validaciones Zod
- Manejo de errores

### 💾 Database Agent
**Enfoque:** Datos y persistencia
- Diseño de esquema PostgreSQL
- Migrations con Prisma
- Optimización de queries
- Índices y performance
- Multi-tenancy segura

### 🔒 Auth & Security Agent
**Enfoque:** Seguridad y compliance
- Autenticación (JWT, OAuth 2.0)
- Autorización (RBAC)
- Encriptación y hashing
- Validación de inputs (XSS, SQL Injection)
- Compliance (RGPD, PCI-DSS, OWASP)

### 🚀 DevOps Agent
**Enfoque:** Infraestructura y deployment
- Docker y Kubernetes configs
- CI/CD pipelines (GitHub Actions)
- Monitoreo y alertas
- Escalado automático
- Disaster recovery

### 🔗 Integration Agent
**Enfoque:** Servicios e integraciones externas
- Pasarelas de pago (Webpay, Stripe)
- Email/SMS (SendGrid, Twilio)
- CDN y almacenamiento (S3, Cloudflare)
- APIs externas
- Webhooks

### ✅ Testing Agent
**Enfoque:** Aseguramiento de calidad
- Tests unitarios (Jest)
- Tests de integración
- Tests E2E (Cypress)
- Load testing (k6)
- Security testing (OWASP ZAP)

### 📖 Documentation Agent
**Enfoque:** Documentación técnica
- API docs (OpenAPI/Swagger)
- Architecture Decision Records (ADRs)
- Deployment guides
- Troubleshooting guides
- Developer onboarding

## Flujo de Trabajo Principal

```
┌─────────────────────────────────────────────┐
│   ESPECIFICACIÓN / REQUISITO               │
└────────────────┬────────────────────────────┘
                 │
                 ▼
        ┌───────────────────────┐
        │  ANÁLISIS Y           │
        │  DESCOMPOSICIÓN       │
        │  (Meta Orchestrator)  │
        └───────────┬───────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │  PLANIFICACIÓN Y      │
        │  ASIGNACIÓN           │
        │  (Meta Orchestrator)  │
        └───────────┬───────────┘
                    │
        ┌───────────┴───────────────────────────┐
        │                                       │
        ▼                                       ▼
    Sub-Agent 1                            Sub-Agent 2
    (Frontend)                             (Backend)
        │                                       │
        ▼                                       ▼
    Implementa                              Implementa
        │                                       │
        ▼                                       ▼
    ┌──────────────────────────────────────────┐
    │  VALIDACIÓN Y PRUEBAS (Testing Agent)   │
    └────────────┬─────────────────────────────┘
                 │
                 ▼
        ┌───────────────────────┐
        │  INTEGRACIÓN          │
        │  (Meta Orchestrator)  │
        └───────────┬───────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │  DOCUMENTACIÓN Y      │
        │  ACTUALIZACIÓN        │
        │  (Meta Orchestrator)  │
        └───────────┬───────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │  RELEASE / COMMIT     │
        │  (Meta Orchestrator)  │
        └───────────────────────┘
```

## Protocolo de Comunicación

### Inicio de Tarea (Orchestrator → Sub-Agent)
```
TASK_ASSIGNMENT:
  - task_id: "UNIQUE_ID"
  - module: "landing|cart|restaurant|admin|auth|payments|notifications|infra"
  - objective: "Clear description"
  - requirements: ["Req 1", "Req 2", "Req 3"]
  - dependencies: ["TASK_ID_1", "TASK_ID_2"]
  - deadline: "YYYY-MM-DD"
  - acceptance_criteria:
      - "AC 1"
      - "AC 2"
  - resources:
      - docs: "PDR_Portal_Restaurantes.md"
      - plan: "docs/PROJECT_PLAN.md"
      - roadmap: "docs/ROADMAP.md"
```

### Reporte de Progreso (Sub-Agent → Orchestrator)
```
PROGRESS_REPORT:
  - task_id: "UNIQUE_ID"
  - status: "in_progress|completed|blocked"
  - progress: "75%"
  - completed: ["Item 1", "Item 2"]
  - pending: ["Item 3"]
  - blockers: ["Description if any"]
  - output_files: ["path/to/file.ts"]
  - tests_passed: "45/50"
  - notes: "Any context"
```

### Validación de Resultado (Orchestrator → Sub-Agent)
```
QUALITY_REVIEW:
  - task_id: "UNIQUE_ID"
  - status: "approved|needs_revision|rejected"
  - quality_score: "8/10"
  - feedback: "Detailed feedback"
  - required_changes: ["Change 1"]
  - next_steps: "What's next"
```

## Matriz de Responsabilidades por Módulo

| Módulo | Frontend | Backend | DB | Auth | DevOps | Integration | Testing | Docs |
|--------|----------|---------|----|----|--------|-------------|---------|------|
| Landing | ✅ Lead | ⚠️ | ⚠️ | - | ✅ | - | ✅ | ✅ |
| Carta Digital | ✅ Lead | ✅ Lead | ✅ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ |
| Gestión Restaurante | ✅ Lead | ✅ Lead | ✅ | ✅ Lead | ⚠️ | ⚠️ | ✅ | ✅ |
| Super Admin | ✅ Lead | ✅ Lead | ✅ | ✅ Lead | ⚠️ | ⚠️ | ✅ | ✅ |
| Auth & Session | ⚠️ | ✅ | ✅ | ✅ Lead | ⚠️ | ✅ | ✅ | ✅ |
| Payments | ⚠️ | ✅ Lead | ✅ | ✅ | ⚠️ | ✅ Lead | ✅ | ✅ |
| Notificaciones | - | ✅ Lead | ⚠️ | - | ⚠️ | ✅ Lead | ✅ | ✅ |
| Infrastructure | - | ⚠️ | ⚠️ | ⚠️ | ✅ Lead | ⚠️ | ✅ | ✅ |

Legenda: ✅ Lead = Responsable principal, ✅ = Contribuye, ⚠️ = Requiere, - = No aplica

## Decisiones Arquitectónicas Clave

### Stack Tecnológico
```
Frontend:  Next.js 14+ | React 18+ | TypeScript | Tailwind CSS
Backend:   NestJS | Node.js 20+ | TypeScript | Zod
Database:  PostgreSQL | Prisma ORM | Redis
Storage:   S3/Minio | Cloudflare CDN
Auth:      JWT | OAuth 2.0 | Bcrypt
Infra:     Docker | Kubernetes | GitHub Actions
Testing:   Jest | Cypress | k6 | OWASP ZAP
```

### Patrones Arquitectónicos
- **Microservicios:** Independientes, escalables
- **Multi-tenant:** Aislamiento completo de datos
- **API-First:** Frontend consume APIs documentadas
- **Domain-Driven Design:** Lógica centrada en dominio
- **SOLID Principles:** Código mantenible y extensible

### Requisitos No-Funcionales
- Performance: <2s FCP, <500ms API responses
- Scalability: 10K+ concurrent users
- Security: OWASP Top 10, RGPD, PCI-DSS
- Availability: 99.9% SLA
- Testing: >80% code coverage

## Criterios de Aceptación por Entrega

### Funcionalidad
- ✅ Todos los requisitos implementados
- ✅ Sin bugs críticos (severidad P0)
- ✅ Bugs menores documentados (P1-P3)

### Calidad de Código
- ✅ Cobertura de tests > 80%
- ✅ ESLint sin errores (Prettier)
- ✅ TypeScript strict mode

### Performance
- ✅ Métricas dentro de SLA definidas
- ✅ Load testing positivo (k6)
- ✅ Optimizaciones documentadas

### Seguridad
- ✅ OWASP compliance verificado
- ✅ Inputs validados y sanitizados
- ✅ Datos sensibles protegidos
- ✅ Logs sin información confidencial

### Documentación
- ✅ Código comentado (lógica compleja)
- ✅ API documentada (OpenAPI)
- ✅ Changelog actualizado
- ✅ README con setup instructions

## Escalación y Resolución de Conflictos

### Nivel 1: Sub-Agent (Resuelve dentro de su especialidad)
- Problema técnico dentro del scope
- Usa toolkit especializado
- Propone solución

### Nivel 2: Cross-Agent (Múltiples agentes involucrados)
- Coordina con otros sub-agentes
- Establece interfaces
- Propone arquitectura integrada

### Nivel 3: Architecture (Decisión arquitectónica)
- Afecta múltiples módulos
- Requiere versionado de API
- Impacto en performance/seguridad

### Nivel 4: Strategic (Decisión a nivel proyecto)
- Cambio en requisitos/alcance
- Aprobación de stakeholders
- Reasignación de prioridades

## Estado Actual del Proyecto

| Aspecto | Estado |
|---------|--------|
| Documentación | ✅ Completa |
| Especificaciones | ✅ Definidas |
| Arquitectura | ✅ Aprobada |
| Roadmap | ✅ Establecido |
| Sub-Agents | 🔄 Configurando |
| Development | ⏳ Próximo |

## Próximos Pasos del Meta Orchestrator

1. ✅ Crear sistema de agentes
2. ⏳ Validar setup con stakeholders
3. ⏳ Iniciar Fase 1: MVP Base
4. ⏳ Crear sprint calendar
5. ⏳ Establecer métricas de éxito
6. ⏳ Comenzar desarrollo coordinado

---

**Versión:** 1.0
**Última actualización:** 2025-12-25
**Responsable:** Meta Orchestrator
**Status:** 🟢 Activo
