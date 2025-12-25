# 📁 Estructura del Proyecto PDR

## Directorio Raíz Limpio

```
PDR/
├── README.md                          # 📘 Punto de entrada - Léelo primero
├── PROJECT_STRUCTURE.md               # Este archivo
├── .gitignore                         # Git ignore rules
├── .editorconfig                      # Editor configuration
├── .prettierrc                        # Prettier configuration
├── .prettierignore                    # Prettier ignore rules
│
├── .claude/                           # 🤖 Sistema de Agentes (NO TOCAR)
│   ├── README.md                      # Guía de uso
│   ├── SYSTEM_OVERVIEW.md             # Overview completo
│   ├── agents/
│   │   ├── meta/
│   │   │   └── ORCHESTRATOR.md        # Meta Agente coordinador
│   │   ├── sub-agents/
│   │   │   ├── FRONTEND_AGENT.md
│   │   │   ├── BACKEND_AGENT.md
│   │   │   ├── DATABASE_AGENT.md
│   │   │   ├── AUTH_SECURITY_AGENT.md
│   │   │   ├── DEVOPS_AGENT.md
│   │   │   ├── INTEGRATION_AGENT.md
│   │   │   ├── TESTING_AGENT.md
│   │   │   └── DOCUMENTATION_AGENT.md
│   │   ├── config/
│   │   │   └── AGENTS_REGISTRY.md
│   │   └── shared/
│   │       └── API_SPECIFICATION.md
│   └── settings.local.json            # Claude Code settings
│
├── .reference/                        # 📚 Especificaciones (NO MODIFICAR)
│   └── PDR_Portal_Restaurantes.md     # Specs completas del proyecto
│
├── docs/                              # 📖 Documentación (REFERENCIA)
│   ├── README.md                      # Guía de documentación
│   ├── PROJECT_PLAN.md                # Plan estratégico
│   ├── ROADMAP.md                     # Timeline v0.1 → v1.0
│   ├── CHANGELOG.md                   # Historial de cambios
│   ├── IDEAS.md                       # Ideas futuras (37 ideas)
│   ├── AGENTS_SETUP_COMPLETE.md       # Setup de agentes
│   └── QUICK_START.txt                # Quick start guide
│
├── src/                               # 💻 CÓDIGO FUENTE (POR CREAR)
│   ├── frontend/                      # Next.js application
│   │   ├── app/                       # App Router (pages)
│   │   ├── components/                # React components
│   │   ├── hooks/                     # Custom React hooks
│   │   ├── services/                  # API clients
│   │   ├── utils/                     # Utility functions
│   │   ├── styles/                    # Global styles
│   │   └── public/                    # Static assets
│   │
│   ├── backend/                       # NestJS microservices
│   │   ├── src/
│   │   │   ├── auth/                  # Authentication module
│   │   │   ├── restaurants/           # Restaurants module
│   │   │   ├── orders/                # Orders module
│   │   │   ├── payments/              # Payments module
│   │   │   ├── notifications/         # Notifications module
│   │   │   ├── common/                # Shared code
│   │   │   └── main.ts                # Entry point
│   │   ├── test/                      # Backend tests
│   │   └── prisma/                    # Database
│   │
│   ├── database/                      # Database configuration
│   │   ├── prisma/
│   │   │   ├── schema.prisma          # Database schema
│   │   │   ├── migrations/            # Migration files
│   │   │   └── seed.ts                # Seed data
│   │   └── scripts/                   # DB scripts
│   │
│   └── infrastructure/                # Infrastructure config
│       ├── docker/                    # Docker configs
│       ├── k8s/                       # Kubernetes manifests
│       ├── terraform/                 # IaC (optional)
│       └── scripts/                   # Deployment scripts
│
├── tests/                             # ✅ TEST SUITES (POR CREAR)
│   ├── unit/                          # Unit tests
│   ├── integration/                   # Integration tests
│   ├── e2e/                           # End-to-end tests
│   ├── performance/                   # Performance tests
│   └── security/                      # Security tests
│
├── docker/                            # 🐳 DOCKER FILES (POR CREAR)
│   ├── Dockerfile.frontend            # Frontend container
│   ├── Dockerfile.backend             # Backend container
│   ├── docker-compose.yml             # Development compose
│   ├── docker-compose.prod.yml        # Production compose
│   └── .dockerignore                  # Docker ignore rules
│
├── k8s/                               # ☸️ KUBERNETES (POR CREAR)
│   ├── namespaces.yml
│   ├── configmaps.yml
│   ├── secrets.yml
│   ├── deployments/
│   ├── services/
│   ├── ingress.yml
│   └── hpa.yml
│
├── node_modules/                      # (Git ignored) Dependencies
├── dist/                              # (Git ignored) Build output
├── coverage/                          # (Git ignored) Test coverage
│
└── (otros archivos generados)
```

---

## 📖 Directorio de Documentación

### `.reference/` - Especificaciones (NO MODIFICAR)
- Especificaciones técnicas completas del proyecto
- Usar como referencia para desarrollo
- No editar sin aprobación del equipo

### `docs/` - Documentación Estable
- **README.md** - Índice de documentación
- **PROJECT_PLAN.md** - Plan estratégico (7,100 líneas)
- **ROADMAP.md** - Timeline y releases (6,000 líneas)
- **CHANGELOG.md** - Historial de cambios (5,600 líneas)
- **IDEAS.md** - 37 Ideas priorizadas (12,000+ líneas)
- **AGENTS_SETUP_COMPLETE.md** - Info del setup de agentes
- **QUICK_START.txt** - Quick start guide

### `.claude/` - Sistema de Agentes (NO TOCAR)
- Sistema de coordinación de agentes
- Documentación de cada agente
- Protocolos de comunicación
- **No modificar sin permiso**

---

## 💻 Directorio `src/` - Estructura de Desarrollo

### Frontend (`src/frontend/`)
```
Aplicación Next.js 14+ con App Router
├── app/                    # Pages (App Router)
├── components/             # React components
├── hooks/                  # Custom hooks
├── services/               # API clients
├── utils/                  # Utilities
├── styles/                 # Global CSS
└── public/                 # Static assets
```

### Backend (`src/backend/`)
```
Microservicios NestJS
├── src/
│   ├── modules/            # Funcionalidad modularizada
│   ├── common/             # Shared utilities
│   ├── guards/             # Auth guards
│   ├── interceptors/       # Logging, etc
│   └── main.ts             # Entry point
├── test/                   # Tests
└── prisma/                 # Database ORM
```

### Database (`src/database/`)
```
PostgreSQL Configuration
├── prisma/
│   ├── schema.prisma       # Schema definition
│   ├── migrations/         # Version-controlled migrations
│   └── seed.ts             # Initial data
└── scripts/                # Database utilities
```

### Infrastructure (`src/infrastructure/`)
```
Deployment & Infrastructure
├── docker/                 # Container configs
├── k8s/                    # Kubernetes manifests
├── terraform/              # Infrastructure as Code
└── scripts/                # Deployment utilities
```

---

## ✅ Para Cuando Comience el Desarrollo

### Phase 1: Setup Inicial
```
1. Crear src/frontend con Next.js scaffold
2. Crear src/backend con NestJS scaffold
3. Crear docker/ con Dockerfiles
4. Crear tests/ con estructura base
5. Setup CI/CD en GitHub Actions
```

### Phase 2-7: Development
```
Mantener estructura limpia:
- No agregar archivos al root
- Todo código en src/
- Tests en tests/
- Docs en docs/ (solo si necesario)
- Docker en docker/
```

---

## 🎯 Reglas de Organización

### ✅ Do's
- ✅ Mantener root limpio
- ✅ Código en `src/`
- ✅ Tests en `tests/`
- ✅ Documentación en `docs/`
- ✅ Config en raíz solo si necesario
- ✅ Ignorar `node_modules/`, `dist/`, etc. con `.gitignore`

### ❌ Don'ts
- ❌ Crear archivos en root sin necesidad
- ❌ Modificar `.reference/` o `.claude/`
- ❌ Código fuente fuera de `src/`
- ❌ Tests fuera de `tests/`
- ❌ Commitear `node_modules/` o build artifacts

---

## 📊 Archivos Configuración

### `.gitignore`
- Define qué archivos ignorar en Git
- Excluye: node_modules, build, logs, env files
- Preserva: docs, .reference, .claude

### `.editorconfig`
- Configuración de editor consistente
- Indentación: 2 espacios
- Line endings: LF
- Charset: UTF-8

### `.prettierrc`
- Configuración de code formatter
- Print width: 100
- Single quotes
- Trailing commas: ES5

### `.prettierignore`
- Archivos ignorados por Prettier
- Excluye: docs, .reference, .claude, node_modules

---

## 🔄 Flujo de Trabajo Típico

### Desarrollo Diario
```
1. Creas un branch desde main/develop
2. Haces cambios en src/
3. Ejecutas tests desde tests/
4. Haces commit
5. Abres PR
6. CI/CD ejecuta (desde raíz)
7. Merge a main cuando aprobado
```

### Agregando Documentación
```
1. Cambios técnicos → docs/
2. Referencias → .reference/
3. Ideas → docs/IDEAS.md
4. Changelog → docs/CHANGELOG.md
```

### Configuración de Agentes
```
1. No modificar .claude/
2. Usar agentes desde IDE
3. Seguir protocolos en .claude/agents/config/
```

---

## 📍 Ubicación de Recursos Clave

| Recurso | Ubicación | Propósito |
|---------|-----------|----------|
| Código | `src/` | Desarrollo |
| Tests | `tests/` | Aseguramiento de calidad |
| Docs | `docs/` | Referencia |
| Specs | `.reference/` | Especificaciones |
| Agentes | `.claude/` | Coordinación |
| Config | Raíz | Configuración del proyecto |

---

## 🎓 Primeros Pasos

1. **Leer README.md** de raíz
2. **Revisar PROJECT_PLAN.md** en docs/
3. **Entender ROADMAP.md**
4. **Revisar Agent system** en .claude/
5. **Comenzar Phase 1** cuando se asigne

---

**Versión:** 1.0
**Creado:** 2025-12-25
**Status:** 🟢 Listo para desarrollo
