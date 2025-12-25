# 🐳 Guía de Docker Setup - Cartify

**Versión:** 1.0
**Fecha:** 2025-12-25
**Status:** 🟢 Activo

---

## Problema: npm ci sin package-lock.json

### Error Encontrado

Al ejecutar `docker-compose up`, Docker intentaba usar `npm ci` pero el proyecto ahora usa `pnpm`, lo que resultaba en:

```
npm error The `npm ci` command can only install with an existing package-lock.json
```

### Solución Implementada

Se actualizaron los Dockerfiles para:

1. **Instalar pnpm globalmente** en la imagen Docker
2. **Copiar pnpm-lock.yaml** junto con package.json
3. **Usar pnpm install --frozen-lockfile** en lugar de npm ci
4. **Remover el atributo version obsoleto** de docker-compose.yml

---

## Dockerfiles Actualizados

### Dockerfile.frontend

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm@8.15.0

# Copiar archivos de dependencias y lock file
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY src/frontend/package.json ./src/frontend/

# Instalar dependencias con pnpm
RUN pnpm install --frozen-lockfile

# Copiar código fuente
COPY src/frontend/ ./src/frontend/

# Build
RUN pnpm --filter ./src/frontend build

# Stage 2: Production
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Instalar pnpm
RUN npm install -g pnpm@8.15.0

# ... resto de configuración
```

### Dockerfile.backend

Similar al frontend, pero con configuración específica para NestJS:

```dockerfile
# Usa pnpm install --frozen-lockfile
# Copia pnpm-lock.yaml y pnpm-workspace.yaml
# Build con: pnpm --filter ./src/backend build
```

### docker-compose.yml

Removido atributo `version: '3.8'` (obsoleto en Docker Compose v2+)

---

## Cómo Levantar Docker

### Paso 1: Asegurar que pnpm-lock.yaml existe

```bash
# Verificar que el lock file existe
ls -la pnpm-lock.yaml

# Si no existe, regenerarlo
pnpm install --frozen-lockfile
```

### Paso 2: Construir y Levantar Servicios

```bash
# Construir y levantar en background
docker-compose -f docker/docker-compose.yml up -d

# Ver logs en tiempo real
docker-compose -f docker/docker-compose.yml logs -f

# Ver estado de servicios
docker-compose -f docker/docker-compose.yml ps
```

### Paso 3: Verificar que los Servicios Estén Corriendo

```bash
# Verificar PostgreSQL
psql -h localhost -U pdr_user -d pdr_dev

# Verificar Redis
redis-cli ping

# Verificar Frontend (una vez esté corriendo)
curl http://localhost:3000

# Verificar Backend
curl http://localhost:3001/health
```

---

## Servicios Incluidos

| Servicio | Puerto | Usuario | Password |
|----------|--------|---------|----------|
| PostgreSQL | 5432 | pdr_user | pdr_password_dev |
| Redis | 6379 | (sin auth) | - |
| Frontend | 3000 | - | - |
| Backend | 3001 | - | - |

---

## Estructura de Build

### Frontend Build Process

1. **Stage 1 (Builder):**
   - Instala pnpm
   - Copia lock files y package.json
   - Instala dependencias
   - Copia código fuente
   - Ejecuta `pnpm build`
   - Genera `.next` artifacts

2. **Stage 2 (Runner):**
   - Imagen limpia de node:20-alpine
   - Instala pnpm
   - Copia dependencias de producción
   - Copia artifacts de build desde Stage 1
   - Ejecuta `pnpm start`

### Backend Build Process

Similar al frontend, pero:
- Build con `pnpm build` genera archivos en `src/backend/dist`
- Incluye Prisma schema para migraciones
- CMD ejecuta `node src/backend/dist/main`

---

## Troubleshooting

### Error: "pnpm: not found"

```bash
# Solución: Asegurar que pnpm está instalado globalmente
npm install -g pnpm@8.15.0

# Verificar
pnpm --version
```

### Error: "pnpm-lock.yaml not found"

```bash
# Solución: Regenerar lock file
pnpm install

# Luego volver a build Docker
docker-compose -f docker/docker-compose.yml build --no-cache
```

### Docker Build Muy Lento

```bash
# Limpiar build cache
docker-compose -f docker/docker-compose.yml down
docker system prune -a
docker-compose -f docker/docker-compose.yml build --no-cache
```

### PostgreSQL no conecta

```bash
# Esperar a que PostgreSQL inicie
# Health check espera máximo 50 segundos
# Verificar logs
docker-compose -f docker/docker-compose.yml logs postgres

# Reintentar conexión
docker-compose -f docker/docker-compose.yml down
docker-compose -f docker/docker-compose.yml up -d
```

---

## Comandos Útiles

```bash
# Levantar servicios
docker-compose -f docker/docker-compose.yml up -d

# Ver estado
docker-compose -f docker/docker-compose.yml ps

# Ver logs
docker-compose -f docker/docker-compose.yml logs -f

# Logs de un servicio específico
docker-compose -f docker/docker-compose.yml logs -f postgres
docker-compose -f docker/docker-compose.yml logs -f redis
docker-compose -f docker/docker-compose.yml logs -f frontend
docker-compose -f docker/docker-compose.yml logs -f backend

# Detener servicios
docker-compose -f docker/docker-compose.yml down

# Limpiar volúmenes (resets base de datos)
docker-compose -f docker/docker-compose.yml down -v

# Reconstruir sin cache
docker-compose -f docker/docker-compose.yml build --no-cache

# Ejecutar comando en contenedor
docker-compose -f docker/docker-compose.yml exec postgres psql -U pdr_user -d pdr_dev
docker-compose -f docker/docker-compose.yml exec redis redis-cli
```

---

## Performance Notes

### Build Time

- **Primera vez:** 3-5 minutos (instala todas las dependencias)
- **Cambios menores:** 1-2 minutos (usa caché de Docker)
- **Cambios grandes:** 2-3 minutos

### Storage

- **Docker images:** ~1.2GB (combinado frontend + backend)
- **Volúmenes:** ~500MB (PostgreSQL + Redis)
- **Espacio total:** ~2GB

### Memory

- **Construcción:** ~1GB
- **Runtime:** ~500MB (en desarrollo)

---

## Próximos Pasos

Una vez que los servicios estén corriendo:

1. **Generar Prisma Client:**
   ```bash
   cd src/backend && pnpm prisma:generate && cd ../..
   ```

2. **Iniciar Desarrollo:**
   ```bash
   pnpm dev
   ```

3. **Acceder a Servicios:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001
   - API Docs: http://localhost:3001/api/docs

---

## Docker Compose Network

Los servicios usan una red Docker personalizada `pdr-network`:

```yaml
networks:
  pdr-network:
    driver: bridge
```

Esto permite que los servicios se comuniquen entre sí:
- Frontend puede acceder al Backend en `http://backend:3001`
- Backend puede acceder a PostgreSQL en `postgres://postgres:5432`
- Backend puede acceder a Redis en `redis://redis:6379`

---

## Security Notes

### Development Only

La configuración de Docker es **SOLO PARA DESARROLLO**:

```yaml
# ⚠️ NO USAR EN PRODUCCIÓN
POSTGRES_PASSWORD: pdr_password_dev  # Contraseña débil
POSTGRES_USER: pdr_user              # Usuario por defecto
```

### Para Producción

1. Usar secrets management (Docker Swarm Secrets, Kubernetes Secrets)
2. Usar credenciales fuertes
3. Configurar SSL/TLS
4. Usar Docker networks privadas
5. Implementar Health checks más robustos

---

**Versión:** 1.0
**Actualizado:** 2025-12-25
**Status:** ✅ Completo
