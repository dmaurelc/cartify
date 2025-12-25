# 🚀 Próximos Pasos - Cartify Phase 1

**Versión:** 1.0
**Fecha:** 2025-12-25
**Status:** 🟢 En Progreso

---

## Estado Actual

✅ **Completado:**
- Scaffold inicial del proyecto
- Monorepo con pnpm configurado
- Frontend Next.js 14+ setup
- Backend NestJS setup
- Prisma schema con 15+ modelos
- Docker multi-stage configurado
- Dockerfiles actualizados para pnpm
- Documentación profesional completa

⏳ **En Progreso:**
- Docker build (primera ejecución ~3-5 minutos)
- Servicios levantando (PostgreSQL, Redis, Frontend, Backend)

---

## Paso 1: Verificar Docker (5-10 min)

### 1.1 Esperar a que Docker termine de construir

```bash
# Verificar estado cada 30 segundos
docker-compose -f docker/docker-compose.yml ps

# Ver logs en tiempo real
docker-compose -f docker/docker-compose.yml logs -f
```

**Esperar a ver algo como:**
```
NAME         STATUS
pdr-postgres Up (healthy)
pdr-redis    Up (healthy)
frontend     Up
backend      Up
```

### 1.2 Verificar Conectividad

```bash
# PostgreSQL
psql -h localhost -U pdr_user -d pdr_dev -c "SELECT 1"
# Debe retornar: (1 row)

# Redis
redis-cli ping
# Debe retornar: PONG

# Frontend
curl http://localhost:3000
# Debe retornar HTML

# Backend Health
curl http://localhost:3001/health
# Debe retornar: {"status":"ok",...}
```

---

## Paso 2: Configurar Prisma (5 min)

Una vez que Docker esté listo:

```bash
# 1. Ir a directorio del proyecto
cd /Users/danielmc/Desktop/ProyectosAstro/cartify

# 2. Generar Prisma client
cd src/backend && pnpm prisma:generate && cd ../..

# Salida esperada:
# ✔ Generated Prisma Client (X.X.X) to ./node_modules/@prisma/client
```

---

## Paso 3: Iniciar Desarrollo (Inmediato)

```bash
# Ejecutar en paralelo:
# - Frontend en http://localhost:3000
# - Backend en http://localhost:3001
pnpm dev
```

**Esperar a ver algo como:**
```
ready - started server on 0.0.0.0:3000
[Nest] 12345 - 12/25/2025, 4:00:00 PM   [NestFactory] Nest application successfully started
```

---

## Paso 4: Verificar que Todo Funciona (5 min)

### 4.1 Frontend

Abre en navegador: http://localhost:3000

Deberías ver:
- ✅ Header de Cartify
- ✅ Página de inicio con hero section
- ✅ Features grid (Menú Digital, Pedidos, Pagos)
- ✅ Status del proyecto

### 4.2 Backend API

Abre en navegador: http://localhost:3001/api/docs

Deberías ver:
- ✅ Swagger UI con documentación
- ✅ Endpoints base:
  - `GET /health` - Health check
  - `GET /` - Info del sistema

Prueba un endpoint:
```bash
curl -X GET http://localhost:3001/health
# Respuesta esperada:
# {
#   "status": "ok",
#   "timestamp": "...",
#   "version": "0.0.0"
# }
```

---

## Phase 1: Implementación (Semanas 1-3)

### Semana 1: Autenticación

**Objetivos:**
- [ ] Sistema de login/registro
- [ ] JWT token management
- [ ] OAuth 2.0 (Google, Apple)
- [ ] Password hashing con bcrypt
- [ ] Rutas protegidas en frontend

**Archivos a crear:**
```
src/backend/src/
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── strategies/
│   │   ├── jwt.strategy.ts
│   │   └── oauth.strategy.ts
│   └── guards/
│       └── jwt.guard.ts

src/frontend/src/
├── (auth)/
│   ├── login/page.tsx
│   ├── register/page.tsx
│   └── components/
│       └── AuthForm.tsx
├── middleware.ts
└── lib/
    └── auth.ts
```

### Semana 2: CRUD de Restaurantes

**Objetivos:**
- [ ] Endpoint POST /restaurants (crear)
- [ ] Endpoint GET /restaurants (listar)
- [ ] Endpoint GET /restaurants/:id (detalle)
- [ ] Endpoint PATCH /restaurants/:id (editar)
- [ ] Panel básico de restaurante en frontend

**Archivos a crear:**
```
src/backend/src/
├── restaurants/
│   ├── restaurants.module.ts
│   ├── restaurants.controller.ts
│   ├── restaurants.service.ts
│   ├── dto/
│   │   ├── create-restaurant.dto.ts
│   │   └── update-restaurant.dto.ts
│   └── decorators/
│       └── current-user.decorator.ts

src/frontend/src/
├── (dashboard)/
│   └── restaurants/
│       ├── page.tsx
│       └── components/
│           ├── RestaurantForm.tsx
│           └── RestaurantList.tsx
```

### Semana 3: Carta Digital & Pedidos

**Objetivos:**
- [ ] Modelos de Categoría y Producto
- [ ] Endpoints GET para menú
- [ ] Página de Carta Digital pública
- [ ] Sistema de Pedidos básico
- [ ] QR generator para mesas

**Archivos a crear:**
```
src/backend/src/
├── categories/
│   ├── categories.controller.ts
│   ├── categories.service.ts
│   └── categories.module.ts
├── products/
│   ├── products.controller.ts
│   ├── products.service.ts
│   └── products.module.ts
└── orders/
    ├── orders.controller.ts
    ├── orders.service.ts
    └── orders.module.ts

src/frontend/src/
├── (public)/
│   ├── menu/
│   │   └── [restaurantId]/page.tsx
│   └── order/
│       └── page.tsx
└── components/
    ├── MenuCard.tsx
    └── OrderForm.tsx
```

---

## Comandos Útiles para Development

### Desarrollo Local

```bash
# Instalar dependencias (si no está hecho)
pnpm install

# Desarrollo en paralelo
pnpm dev

# Solo frontend
cd src/frontend && pnpm dev

# Solo backend
cd src/backend && pnpm dev

# Build
pnpm build

# Tests
pnpm test
pnpm test:watch

# Lint & Format
pnpm lint
pnpm format
pnpm type-check
```

### Docker

```bash
# Levantar servicios
pnpm docker:up

# Detener servicios
pnpm docker:down

# Ver logs
pnpm docker:logs

# Reconstruir imágenes
pnpm docker:build

# Limpiar todo (⚠️ borra base de datos)
docker-compose -f docker/docker-compose.yml down -v
```

### Prisma

```bash
# Generar Prisma client
cd src/backend && pnpm prisma:generate

# Ver estado de migraciones
pnpm db:status

# Crear migración
pnpm db:migrate:dev

# Seed base de datos
pnpm db:seed

# Reset base de datos (⚠️ borra todo)
pnpm db:reset
```

---

## Checklist Pre-Development

Antes de comenzar a codificar:

```
☐ Docker está corriendo (todos los servicios en "Up")
☐ Frontend accesible en http://localhost:3000
☐ Backend health check OK en http://localhost:3001/health
☐ Prisma client generado (pnpm prisma:generate completó)
☐ Base de datos PostgreSQL conectada
☐ Redis funcionando
☐ IDE abierto (VS Code con extensión Claude Code)
☐ Terminal con `pnpm dev` ejecutándose
```

---

## Reglas de Desarrollo (IMPORTANTE)

### Commits

```bash
# ✅ CORRECTO:
git add <archivos>
git commit -m "feat: Implementar login con JWT"

# ❌ INCORRECTO:
git commit -m "fix"
git commit -m "cambios"
```

### Código

- ✅ TypeScript strict mode obligatorio
- ✅ Máximo 1000 líneas por archivo
- ✅ Documentación en español
- ✅ Tests para lógica crítica
- ✅ ESLint + Prettier antes de commit

### Versionado

Se sigue Semantic Versioning:
- `MAJOR.MINOR.PATCH` (ej: 0.1.0)
- `MINOR` para nuevas features
- `PATCH` para bugs
- Ver `VERSIONADO_SEMANTICO.md` para detalles

---

## Documentación Importante

**Lee antes de comenzar:**

1. [README.md](./README.md) - Overview del proyecto
2. [REGLAS_PROYECTO.md](./REGLAS_PROYECTO.md) - Convenios de desarrollo
3. [VERSIONADO_SEMANTICO.md](./VERSIONADO_SEMANTICO.md) - Estrategia de releases
4. [docs/PNPM_GUIDE.md](./docs/PNPM_GUIDE.md) - Guía de pnpm
5. [docs/DOCKER_SETUP.md](./docs/DOCKER_SETUP.md) - Guía de Docker
6. [.claude/README.md](./.claude/README.md) - Sistema de agentes

---

## Estructura de Ramas Git

```
main          ← Producción (protected)
  ↑
  release/v0.1.0  ← Pre-release
  ↑
  develop       ← Desarrollo
  ↑
  feature/*     ← Nuevas features
  fix/*         ← Bug fixes
```

### Crear Feature Branch

```bash
# Nueva feature
git checkout -b feature/autenticacion develop
git push -u origin feature/autenticacion

# Bug fix
git checkout -b fix/login-error develop
git push -u origin fix/login-error
```

---

## Ambiente de Desarrollo

### Variables de Entorno (Backend)

El archivo `src/backend/.env.local` debe contener:

```env
# Database
DATABASE_URL="postgresql://pdr_user:pdr_password_dev@localhost:5432/pdr_dev"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="your-secret-key-change-in-production"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_SECRET="your-refresh-secret"
JWT_REFRESH_EXPIRES_IN="7d"

# Node
NODE_ENV="development"
PORT=3001

# CORS
CORS_ORIGIN="http://localhost:3000"

# Email (opcional)
SENDGRID_API_KEY=""

# SMS (opcional)
TWILIO_ACCOUNT_SID=""
TWILIO_AUTH_TOKEN=""

# Pagos (opcional)
WEBPAY_COMMERCE_CODE=""
WEBPAY_API_KEY=""
```

---

## Troubleshooting Rápido

### "Cannot find module @prisma/client"

```bash
cd src/backend && pnpm prisma:generate
```

### "Port 3000 already in use"

```bash
# Encontrar y matar proceso
lsof -i :3000
kill -9 <PID>

# O cambiar puerto en next.config.js
```

### "Cannot connect to PostgreSQL"

```bash
# Verificar que Docker está corriendo
docker-compose -f docker/docker-compose.yml ps

# Reiniciar servicios
docker-compose -f docker/docker-compose.yml down
docker-compose -f docker/docker-compose.yml up -d
```

### "pnpm command not found"

```bash
npm install -g pnpm@8.15.0
pnpm --version
```

---

## Recursos y Enlaces

- **Documentación Oficial:**
  - [Next.js 14](https://nextjs.org/docs)
  - [NestJS 10](https://docs.nestjs.com)
  - [Prisma 5](https://www.prisma.io/docs)
  - [TypeScript 5](https://www.typescriptlang.org/docs)

- **Documentación del Proyecto:**
  - [.reference/PDR_Portal_Restaurantes.md](.reference/PDR_Portal_Restaurantes.md)
  - [docs/PROJECT_PLAN.md](./docs/PROJECT_PLAN.md)
  - [docs/ROADMAP.md](./docs/ROADMAP.md)

- **Contacto:**
  - Sistema de Agentes: [.claude/README.md](./.claude/README.md)
  - Preguntas técnicas: Revisar agent específico en `.claude/agents/sub-agents/`

---

## Resumen Rápido

**Ahora mismo:**
1. ⏳ Docker sigue construyendo (esperar 3-5 min)

**En los próximos 10 minutos:**
2. ✅ Verificar que Docker levantó correctamente
3. ✅ Ejecutar `pnpm prisma:generate`
4. ✅ Ejecutar `pnpm dev`

**En los próximos 30 minutos:**
5. ✅ Revisar frontend y backend funcionando
6. ✅ Probar endpoints en Swagger

**Luego:**
7. 🚀 Comenzar con Semana 1 - Autenticación

---

**¿Listo para empezar?** Mantente pendiente del estado del Docker build y una vez que esté listo, ejecuta los pasos 2-4 anterior.

---

**Versión:** 1.0
**Actualizado:** 2025-12-25
**Status:** ✅ Listo para Phase 1
