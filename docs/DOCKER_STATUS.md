# 📋 Estado Docker - Cartify

**Actualizado:** 2025-12-25
**Status:** ✅ Completamente Operacional

---

## Servicios Corriendo

| Servicio      | Imagen              | Puerto (Host) | Puerto (Interno) | Estado  |
|---------------|---------------------|---------------|------------------|---------|
| PostgreSQL    | postgres:15-alpine  | 5433          | 5432             | ✅ Healthy |
| Redis         | redis:7-alpine      | 6379          | 6379             | ✅ Healthy |
| Backend       | docker-backend      | 3001          | 3001             | ✅ Running |
| Frontend      | docker-frontend     | 3000          | 3000             | ✅ Running |

---

## Verificación de Servicios

### Backend - NestJS

**Endpoint de salud:**
```bash
curl http://localhost:3001/api/health
```

**Respuesta esperada:**
```json
{
  "status": "ok",
  "timestamp": "2025-12-25T16:53:01.106Z",
  "version": "0.1.0"
}
```

**Swagger API Docs:**
```
http://localhost:3001/api/docs
```

### Frontend - Next.js

**URL:**
```
http://localhost:3000
```

**Status:** Corriendo (retorna 404 en `/` porque página raíz no existe aún)

### PostgreSQL

**Conexión:**
```bash
psql -h localhost -p 5433 -U pdr_user -d pdr_dev
```

**Credenciales:**
- Usuario: `pdr_user`
- Contraseña: `pdr_password_dev`
- Database: `pdr_dev`

### Redis

**Verificar conexión:**
```bash
redis-cli -p 6379 ping
```

**Respuesta esperada:** `PONG`

---

## Problemas Resueltos

### ✅ Error: npm ci sin package-lock.json

**Problema:** Dockerfiles usaban `npm ci` pero proyecto migró a pnpm.

**Solución:** Actualización de Dockerfiles para usar `pnpm install --frozen-lockfile`

### ✅ Error: @nestjs/config no encontrado

**Problema:** Faltaba dependencia `@nestjs/config` en backend.

**Solución:** Agregada a `src/backend/package.json` versión `^3.1.1`

### ✅ Error: Decoradores incompatibles con TypeScript 5.x

**Problema:** `error TS1241: Unable to resolve signature of method decorator`

**Solución:** Habilitadas opciones en `src/backend/tsconfig.json`:
```json
{
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true
}
```

### ✅ Error: Puertos ocupados (PostgreSQL 5432)

**Problema:** PostgreSQL local usando puerto 5432 del sistema.

**Solución:** Cambio de puerto en docker-compose.yml a 5433, manteniéndose 5432 interno en contenedor.

---

## Próximos Pasos

### 1. Generar Prisma Client

```bash
cd src/backend && pnpm prisma:generate && cd ../..
```

### 2. (Opcional) Desarrollo Local con pnpm

Si prefieres desarrollar localmente sin Docker:

```bash
pnpm install
pnpm dev
```

Esto levantará:
- Frontend en http://localhost:3000
- Backend en http://localhost:3001

### 3. Crear Página de Inicio (Frontend)

Crear `src/frontend/src/app/page.tsx` con contenido inicial.

---

## Logs y Diagnosticar

### Ver logs de un servicio específico

```bash
# Backend
docker-compose -f docker/docker-compose.yml logs -f backend

# Frontend
docker-compose -f docker/docker-compose.yml logs -f frontend

# PostgreSQL
docker-compose -f docker/docker-compose.yml logs -f postgres

# Redis
docker-compose -f docker/docker-compose.yml logs -f redis
```

### Ver logs de todos los servicios

```bash
docker-compose -f docker/docker-compose.yml logs -f
```

### Ver estado de todos los contenedores

```bash
docker-compose -f docker/docker-compose.yml ps
```

---

## Comandos Útiles

```bash
# Levantar servicios
docker-compose -f docker/docker-compose.yml up -d

# Detener servicios
docker-compose -f docker/docker-compose.yml down

# Detener y limpiar volúmenes (reset de base de datos)
docker-compose -f docker/docker-compose.yml down -v

# Reconstruir sin caché
docker-compose -f docker/docker-compose.yml build --no-cache

# Reiniciar un servicio específico
docker-compose -f docker/docker-compose.yml restart backend

# Ejecutar comando en contenedor
docker-compose -f docker/docker-compose.yml exec backend bash
```

---

## Variables de Entorno

El backend usa las siguientes variables (configuradas en docker-compose.yml):

```
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://pdr_user:pdr_password_dev@postgres:5432/pdr_dev
REDIS_URL=redis://redis:6379
JWT_SECRET=dev-jwt-secret-key-min-32-chars
CORS_ORIGIN=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

---

## Arquitectura de Contenedores

```
┌─────────────────────────────────────────────────┐
│          Docker Network: pdr-network            │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌────────────────┐     ┌───────────────────┐  │
│  │   Frontend     │────→│     Backend       │  │
│  │  :3000         │     │     :3001         │  │
│  │  Next.js 14.2  │     │     NestJS 10.2   │  │
│  └────────────────┘     └─────────┬─────────┘  │
│                                   │             │
│                    ┌──────────────┼────────┐    │
│                    │              │        │    │
│                    ▼              ▼        ▼    │
│             ┌──────────────┐  ┌────────────┐   │
│             │ PostgreSQL   │  │   Redis    │   │
│             │ :5432        │  │   :6379    │   │
│             └──────────────┘  └────────────┘   │
│                                                 │
└─────────────────────────────────────────────────┘

Puertos Expuestos (Host):
  - Frontend:   0.0.0.0:3000   → :3000
  - Backend:    0.0.0.0:3001   → :3001
  - PostgreSQL: 0.0.0.0:5433   → :5432 (conflicto evitado)
  - Redis:      0.0.0.0:6379   → :6379
```

---

## Multi-stage Dockerfile

Ambos servicios usan multi-stage builds para optimizar tamaño:

### Frontend Build Process

1. **Builder Stage:** Instala deps, construye con `pnpm build`
2. **Runner Stage:** Imagen limpia, solo dependencias producción, copia artifacts

### Backend Build Process

1. **Builder Stage:** Instala deps, compila con `pnpm --filter ./src/backend build`
2. **Runner Stage:** Imagen limpia, solo dependencias producción, ejecuta `node dist/main`

---

## Troubleshooting

Para problemas comunes, consulta:
- `docs/TROUBLESHOOTING.md` - Guía completa de solución de problemas
- `docs/DOCKER_SETUP.md` - Información sobre configuración de Docker
- `docs/PNPM_GUIDE.md` - Guía de uso de pnpm

---

## Última Actualización

**Commit:** `9ba77a1`
**Fecha:** 2025-12-25
**Cambios:** Fix Docker build y configuración, todos servicios operacionales

---

**Status:** ✅ Completamente Operacional y Listo para Desarrollo
