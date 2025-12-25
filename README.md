# 🍽️ PDR - Portal Digital de Restaurantes

**Plataforma SaaS para la digitalización completa de menús y gestión de pedidos en restaurantes.**

## 📋 Descripción Rápida

PDR es una solución integral que permite a restaurantes:
- 📱 Crear cartas digitales accesibles por código QR
- 🛒 Recibir pedidos directamente a través de la plataforma
- 💳 Procesar pagos de forma segura
- 📊 Analizar datos y optimizar operaciones
- 👥 Gestionar múltiples sucursales (future)

---

## 🚀 Comenzar

### Para Desarrolladores
1. **Inicio:** [`docs/COMENZAR_DESARROLLO.md`](docs/COMENZAR_DESARROLLO.md) ⭐ EMPEZAR AQUÍ
2. **Docker:** [`docs/DOCKER_STATUS.md`](docs/DOCKER_STATUS.md)
3. **Reglas:** [`docs/REGLAS_PROYECTO.md`](docs/REGLAS_PROYECTO.md)

### Para Project Managers
1. **Roadmap Phase 1:** [`docs/FASE_1_ROADMAP.md`](docs/FASE_1_ROADMAP.md)
2. **Status:** [`docs/PROJECT_STATUS.md`](docs/PROJECT_STATUS.md)
3. **Changelog:** [`docs/CHANGELOG.md`](docs/CHANGELOG.md)

### Para Stakeholders
1. **Overview:** [`docs/PROJECT_PLAN.md`](docs/PROJECT_PLAN.md) - Sección "Resumen Ejecutivo"
2. **Timeline:** [`docs/ROADMAP.md`](docs/ROADMAP.md)
3. **Ideas:** [`docs/IDEAS.md`](docs/IDEAS.md)
4. **Hito Scaffold:** [`docs/HITO_SCAFFOLD.md`](docs/HITO_SCAFFOLD.md)

---

## 📂 Estructura del Proyecto

```
PDR/
├── README.md                          ← Estás aquí
├── .claude/                           # 🤖 Sistema de agentes Claude Code
│   ├── README.md                      # Guía de uso
│   ├── SYSTEM_OVERVIEW.md             # Overview completo
│   └── agents/                        # Agentes especializados
│       ├── meta/ORCHESTRATOR.md       # Meta Agente coordinador
│       ├── sub-agents/                # 8 Sub-agentes
│       ├── config/AGENTS_REGISTRY.md  # Registro central
│       └── shared/API_SPECIFICATION.md # Specs compartidas
│
├── .reference/                        # 📚 Especificaciones y referencias
│   └── PDR_Portal_Restaurantes.md     # Specs completas del proyecto
│
├── docs/                              # 📖 Documentación del proyecto
│   ├── README.md                      # Guía de documentación
│   ├── PROJECT_PLAN.md                # Plan estratégico
│   ├── ROADMAP.md                     # Timeline de releases
│   ├── CHANGELOG.md                   # Historial de cambios
│   ├── IDEAS.md                       # Ideas futuras (37)
│   ├── AGENTS_SETUP_COMPLETE.md       # Setup de agentes
│   └── QUICK_START.txt                # Quick start guide
│
├── src/                               # (Por crear) Código fuente
│   ├── frontend/                      # Aplicación Next.js
│   ├── backend/                       # Microservicios NestJS
│   ├── database/                      # Configuración DB
│   └── infrastructure/                # Docker, K8s configs
│
├── tests/                             # (Por crear) Tests
├── docker/                            # (Por crear) Docker configs
├── k8s/                               # (Por crear) Kubernetes configs
│
└── .gitignore                         # (Por crear) Git ignore rules
```

---

## 🎯 Sistema de Agentes (Ya Creado)

Se ha creado un sistema completo de coordinación:

- **1 Meta Orchestrator** - Coordinador central
- **8 Sub-Agents Especializados:**
  - 🎨 Frontend Agent (Next.js, React)
  - ⚙️ Backend Agent (NestJS, APIs)
  - 💾 Database Agent (PostgreSQL)
  - 🔒 Auth & Security Agent
  - 🚀 DevOps Agent (Docker, K8s)
  - 🔗 Integration Agent (Pagos, Email)
  - ✅ Testing Agent (Jest, Cypress)
  - 📖 Documentation Agent

**Más info:** [`.claude/README.md`](.claude/README.md)

---

## 📊 Stack Tecnológico

### Frontend
- **Next.js 14+** (App Router)
- **React 18+**
- **TypeScript**
- **Tailwind CSS**

### Backend
- **NestJS** (Framework)
- **Node.js 20+**
- **TypeScript**
- **Prisma ORM**

### Database
- **PostgreSQL 15+**
- **Redis** (Cache)
- **Prisma** (Migrations)

### Infrastructure
- **Docker**
- **Kubernetes**
- **GitHub Actions** (CI/CD)

### Security
- **JWT** + **OAuth 2.0**
- **Bcrypt** (Password hashing)
- **HTTPS/TLS**

---

## 📈 Fases del Proyecto

### ✅ Phase 0: Documentación & Setup (Completado)
- ✅ Especificaciones detalladas
- ✅ Plan estratégico
- ✅ Roadmap
- ✅ Sistema de agentes
- ✅ Ideas board

### ⏳ Phase 1: MVP Base (Semanas 1-3)
- [ ] Setup inicial del proyecto
- [ ] Infrastructure base
- [ ] Database schema
- [ ] Backend foundations
- [ ] Frontend setup

### ⏳ Phases 2-7: Feature Development (Semanas 4-19)
- Carta Digital
- Gestión de Restaurante
- Pagos
- Panel de Super Admin
- Optimizaciones
- Production Release

---

## 🔗 Enlaces Importantes

### Documentación
- 📘 [Documentación Principal](docs/README.md)
- 📋 [Plan Estratégico](docs/PROJECT_PLAN.md)
- 🚀 [Roadmap](docs/ROADMAP.md)
- 📝 [Changelog](docs/CHANGELOG.md)
- 💡 [Ideas Board](docs/IDEAS.md)

### Sistema de Agentes
- 🤖 [Agentes Overview](.claude/README.md)
- 🎯 [Meta Orchestrator](.claude/agents/meta/ORCHESTRATOR.md)
- 📋 [Agents Registry](.claude/agents/config/AGENTS_REGISTRY.md)

### Especificaciones
- 📚 [Especificaciones Completas](.reference/PDR_Portal_Restaurantes.md)

---

## 🛠️ Requisitos Previos

Para comenzar el desarrollo necesitarás:

- **Node.js** 20+
- **pnpm** 8.0+
- **Docker** & **Docker Compose**
- **Git**
- **VS Code** (recomendado) + extensión Claude Code

---

## 📞 Contacto y Coordinación

El proyecto usa un sistema de agentes especializados coordinados por un Meta Orchestrator.

Para consultas sobre:
- **Arquitectura/Planificación:** Meta Orchestrator
- **Interfaces web:** Frontend Agent
- **APIs y lógica:** Backend Agent
- **Bases de datos:** Database Agent
- **Seguridad:** Auth & Security Agent
- **Infraestructura:** DevOps Agent
- **Integraciones:** Integration Agent
- **Quality:** Testing Agent
- **Documentación:** Documentation Agent

Más detalles en [`.claude/agents/config/AGENTS_REGISTRY.md`](.claude/agents/config/AGENTS_REGISTRY.md)

---

## 📝 Licencia

(Por definir según necesidades del proyecto)

---

## ✨ Status Actual

| Componente | Status |
|-----------|--------|
| Especificaciones | ✅ Completas |
| Documentación | ✅ Profesional |
| Plan Estratégico | ✅ Definido |
| Roadmap | ✅ Establecido |
| Sistema de Agentes | ✅ Operacional |
| **Código** | ⏳ Próximo (Phase 1) |

---

## 🚀 Próximos Pasos

1. **Revisar Documentación:** Leer plans y especificaciones
2. **Validar Stack:** Confirmar tecnologías elegidas
3. **Iniciar Phase 1:** Scaffold del proyecto
4. **Coordinar Desarrollo:** Usar sistema de agentes

---

**Última actualización:** 2025-12-25
**Versión:** 0.0.0 (Pre-release)
**Status:** 🟢 Documentación & Setup Completado
