# 📋 Agents Registry & Configuration

## Registro Central de Agentes

### Meta Orchestrator
- **Role:** Coordinador central del proyecto
- **Path:** `meta/ORCHESTRATOR.md`
- **Responsabilidades:** Planificación, orquestación, integración, validación
- **Status:** 🟢 Activo

---

## Sub-Agents

### 1. Frontend Agent
- **Path:** `sub-agents/FRONTEND_AGENT.md`
- **Especialización:** Interfaces web (Next.js, React, Tailwind)
- **Módulos:** Landing Page, Carta Digital, Dashboards
- **Status:** 🟢 Activo
- **Stack:** Next.js, React, TypeScript, Tailwind CSS, Cypress
- **Comunicación:** ← Backend (APIs), ← Auth (tokens), ← Testing (coverage)

### 2. Backend Agent
- **Path:** `sub-agents/BACKEND_AGENT.md`
- **Especialización:** APIs y lógica de negocio (NestJS)
- **Módulos:** Auth, Restaurants, Orders, Payments, Notifications
- **Status:** 🟢 Activo
- **Stack:** NestJS, Node.js, TypeScript, Prisma, JWT
- **Comunicación:** → Frontend (APIs), ← Database (schema), → Integration (services)

### 3. Database Agent
- **Path:** `sub-agents/DATABASE_AGENT.md`
- **Especialización:** Persistencia de datos (PostgreSQL)
- **Módulos:** Schema design, Migrations, Optimization
- **Status:** 🟢 Activo
- **Stack:** PostgreSQL, Prisma ORM, Redis
- **Comunicación:** ← Backend (entities), → Backend (queries), ← DevOps (scaling)

### 4. Auth & Security Agent
- **Path:** `sub-agents/AUTH_SECURITY_AGENT.md`
- **Especialización:** Autenticación, autorización y seguridad
- **Módulos:** JWT, OAuth, RBAC, Encryption, Compliance
- **Status:** 🟢 Activo
- **Stack:** JWT, Bcrypt, OAuth 2.0, Helmet, Rate limiting
- **Comunicación:** → Backend (guards), → Frontend (token handling), → Testing (security tests)

### 5. DevOps Agent
- **Path:** `sub-agents/DEVOPS_AGENT.md`
- **Especialización:** Infraestructura, deployment y operaciones
- **Módulos:** Docker, Kubernetes, CI/CD, Monitoring
- **Status:** 🟢 Activo
- **Stack:** Docker, Kubernetes, GitHub Actions, Prometheus, Grafana
- **Comunicación:** ← All Agents (deployables), → All Agents (infrastructure)

### 6. Integration Agent
- **Path:** `sub-agents/INTEGRATION_AGENT.md`
- **Especialización:** Servicios e integraciones externas
- **Módulos:** Pagos, Email/SMS, Storage, OAuth
- **Status:** 🟢 Activo
- **Stack:** Webpay, Stripe, SendGrid, Twilio, S3, AWS SDK
- **Comunicación:** ← Backend (usage), ← DevOps (credentials), → Testing (mocks)

### 7. Testing Agent
- **Path:** `sub-agents/TESTING_AGENT.md`
- **Especialización:** Aseguramiento de calidad
- **Módulos:** Unit, Integration, E2E, Performance, Security
- **Status:** 🟢 Activo
- **Stack:** Jest, Cypress, k6, OWASP ZAP, Supertest
- **Comunicación:** ← All Agents (code), → All Agents (quality feedback)

### 8. Documentation Agent
- **Path:** `sub-agents/DOCUMENTATION_AGENT.md`
- **Especialización:** Documentación técnica
- **Módulos:** API Docs, Architecture, Developer Guides, Deployment
- **Status:** 🟢 Activo
- **Stack:** OpenAPI/Swagger, MkDocs, PlantUML, Markdown
- **Comunicación:** ← All Agents (specs), → All Agents (docs)

---

## Communication Matrix

```
                    Frontend  Backend  Database  Auth  DevOps  Integration  Testing  Docs
Frontend                -      ↓        ↓       ↓      ↓       ↓           ↓        ↓
Backend              ↑         -        ↓       ↓      ↓       ↓           ↓        ↓
Database             ↑         ↑        -       ↓      ↓       ↓           ↓        ↓
Auth                 ↑         ↑        ↑       -      ↓       ↓           ↓        ↓
DevOps               ↑         ↑        ↑       ↑      -       ↓           ↓        ↓
Integration          ↑         ↑        ↑       ↑      ↑       -           ↓        ↓
Testing              ↑         ↑        ↑       ↑      ↑       ↑           -        ↓
Documentation        ↑         ↑        ↑       ↑      ↑       ↑           ↑        -

↓ = requiere de
↑ = proporciona a
- = no aplica
```

---

## Agent Initialization Sequence

### Phase 1: Setup (Semana 1)
1. **Database Agent** - Crea schema.prisma y migrations
2. **Backend Agent** - Inicializa NestJS project
3. **Frontend Agent** - Inicializa Next.js project
4. **Auth Agent** - Implementa JWT strategy

### Phase 2: Core Features (Semanas 2-3)
1. **Backend Agent** - Crea servicios base
2. **Database Agent** - Refina schema según necesidades
3. **Frontend Agent** - Crea componentes base
4. **Testing Agent** - Configura testing infrastructure

### Phase 3: Integration (Semanas 4-5)
1. **Integration Agent** - Configura servicios externos
2. **DevOps Agent** - Dockerización
3. **All Agents** - Integración cross-module

### Phase 4: Quality & Ops (Semanas 6+)
1. **Testing Agent** - Testing exhaustivo
2. **DevOps Agent** - CI/CD pipelines
3. **Documentation Agent** - Documentación completa
4. **Security Agent** - Auditoría de seguridad

---

## Agent Roles & Responsibilities

### Core Responsibilities (All Agents)
- ✅ Implementar asignaciones del Orchestrator
- ✅ Reportar progreso regularmente
- ✅ Identificar blockers
- ✅ Mantener documentación actualizada
- ✅ Cumplir criterios de aceptación

### Specialized Responsibilities

#### Frontend Agent
- Implementar UI/UX según especificaciones
- Optimizar performance frontend
- Testing de componentes
- Asegurar responsiveness y accesibilidad

#### Backend Agent
- Diseñar e implementar APIs
- Lógica de negocio
- Validaciones
- Testing de servicios

#### Database Agent
- Diseño de esquema eficiente
- Migraciones versionadas
- Optimizaciones
- Multi-tenant isolation

#### Auth & Security Agent
- Implementar autenticación segura
- RBAC enforcement
- Compliance (OWASP, RGPD, PCI-DSS)
- Security audits

#### DevOps Agent
- Infrastructure as Code
- CI/CD pipelines
- Monitoring y alertas
- Disaster recovery

#### Integration Agent
- APIs de terceros
- Webhook handling
- Manejo de errores
- Retry logic

#### Testing Agent
- Cobertura de tests > 80%
- Automatización de testing
- Performance benchmarking
- Security testing

#### Documentation Agent
- API documentation (OpenAPI)
- Architecture documentation
- Developer guides
- Deployment guides

---

## Sprint Planning Template

```markdown
# Sprint [NUMBER] - [DATE RANGE]

## Meta Orchestrator Tasks
- [ ] Sprint planning
- [ ] Assignment distribution
- [ ] Dependency tracking
- [ ] Progress monitoring
- [ ] Integration validation

## Agent Assignments

### Frontend Agent
- [ ] Task 1
- [ ] Task 2

### Backend Agent
- [ ] Task 1
- [ ] Task 2

... (other agents)

## Cross-Agent Dependencies
- Task A (Frontend) blocks Task B (Backend)
- Task C (Database) required for Task D (Backend)

## Success Criteria
- [ ] All tests passing
- [ ] Code review complete
- [ ] Integration tested
- [ ] Documentation updated
- [ ] Deployment ready
```

---

## Status Dashboard

| Agent | Status | Current Task | Blocker | ETA |
|-------|--------|-------------|---------|-----|
| Meta Orchestrator | 🟢 Activo | Planning | Ninguno | - |
| Frontend | 🟢 Ready | Waiting Orchestrator | None | Week 2 |
| Backend | 🟢 Ready | Waiting Orchestrator | DB Schema | Week 2 |
| Database | 🟢 Ready | Waiting Orchestrator | None | Week 1 |
| Auth & Security | 🟢 Ready | Waiting Orchestrator | None | Week 2 |
| DevOps | 🟢 Ready | Waiting Orchestrator | Code | Week 4 |
| Integration | 🟢 Ready | Waiting Orchestrator | APIs | Week 5 |
| Testing | 🟢 Ready | Waiting Orchestrator | Code | Week 2 |
| Documentation | 🟢 Ready | Waiting Orchestrator | Specs | Week 2 |

---

## Key Contacts & Escalation

### Issues by Type

#### Technical Architecture
→ Meta Orchestrator

#### Code Implementation
→ Respective Sub-Agent

#### Cross-Agent Conflicts
→ Meta Orchestrator

#### Security/Compliance
→ Auth & Security Agent → Meta Orchestrator

#### Performance Issues
→ DevOps Agent → Meta Orchestrator

#### Deployment Issues
→ DevOps Agent → Meta Orchestrator

#### Testing Failures
→ Testing Agent → Meta Orchestrator

---

## Agent Updates & Maintenance

**Last Updated:** 2025-12-25
**Version:** 1.0
**Next Review:** Cuando comience Fase 1

### How to Update This Registry
1. Update agent status when changes occur
2. Log communication between agents
3. Track sprints and milestones
4. Document decisions and blockers
5. Review weekly with Meta Orchestrator

---

## Quick Links

- 📚 [Project Documentation](../../docs/)
- 🎯 [Project Plan](../../docs/PROJECT_PLAN.md)
- 🚀 [Roadmap](../../docs/ROADMAP.md)
- 💡 [Ideas Board](../../docs/IDEAS.md)
- 📝 [Original Specifications](../../PDR_Portal_Restaurantes.md)
