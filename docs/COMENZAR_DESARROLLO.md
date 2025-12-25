# 🚀 Comenzar Desarrollo - Cartify

**Status:** Docker operacional ✅
**Fecha:** 2025-12-25

---

## Opción 1: Desarrollo Local (Recomendado para desarrollo activo)

Si deseas modificar código y ver cambios en tiempo real, usa esta opción:

### Paso 1: Verificar Docker esté corriendo

```bash
# Verificar que PostgreSQL y Redis estén disponibles
docker-compose -f docker/docker-compose.yml ps

# Debe mostrar postgres y redis como "Healthy"
```

### Paso 2: Instalar dependencias (solo una vez)

```bash
pnpm install
```

### Paso 3: Generar Prisma Client (solo una vez)

```bash
cd src/backend && pnpm prisma:generate && cd ../..
```

### Paso 4: Iniciar desarrollo

```bash
pnpm dev
```

Esto levantará en paralelo:
- ✅ Frontend: http://localhost:3000
- ✅ Backend: http://localhost:3001
- ✅ Swagger Docs: http://localhost:3001/api/docs

---

## Opción 2: Desarrollo con Docker (Aislado)

Si prefieres un entorno completamente containerizado:

### Paso 1: Asegurar todo esté limpio

```bash
docker-compose -f docker/docker-compose.yml down -v
```

### Paso 2: Levantar servicios

```bash
docker-compose -f docker/docker-compose.yml up -d
```

### Paso 3: Esperar que estén healthy

```bash
docker-compose -f docker/docker-compose.yml ps
```

### Paso 4: Acceder a servicios

- Frontend: http://localhost:3000
- Backend: http://localhost:3001/api/health
- Swagger Docs: http://localhost:3001/api/docs

---

## Configuración Inicial del Proyecto

### Base de Datos

El esquema Prisma incluye 15+ modelos:
- `Usuario` - Cuentas con roles
- `Restaurante` - Multi-tenancy base
- `Categoria` - Categorías de menú
- `Producto` - Items del menú
- `Pedido` - Órdenes
- `Mesa` - Mesas con QR
- Y más...

**Migrar base de datos:**

```bash
cd src/backend
pnpm prisma migrate dev --name init
cd ../..
```

### Variables de Entorno (Desarrollo Local)

Crear `src/backend/.env.local`:

```
DATABASE_URL="postgresql://pdr_user:pdr_password_dev@localhost:5433/pdr_dev"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="dev-jwt-secret-key-min-32-chars"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_SECRET="dev-refresh-secret-min-32-chars"
JWT_REFRESH_EXPIRES_IN="7d"
NODE_ENV="development"
PORT=3001
CORS_ORIGIN="http://localhost:3000"
```

---

## Stack Tecnológico

### Frontend
- **Next.js 14.2.3** (App Router)
- **React 18.3.1**
- **TypeScript 5.2.2**
- **Tailwind CSS 3.4.1**
- **React Hook Form + Zod**

### Backend
- **NestJS 10.2.10**
- **Node.js 20+**
- **TypeScript 5.2.2**
- **Prisma 5.7.1**
- **PostgreSQL 15**
- **Redis 7**

### DevOps
- **pnpm 8.15.0** (package manager)
- **Docker + Docker Compose**
- **GitHub** (version control)

---

## Comandos Útiles

### Desarrollo

```bash
# Iniciar desarrollo (ambos workspaces)
pnpm dev

# Build (ambos workspaces)
pnpm build

# Tests
pnpm test

# Linting
pnpm lint

# Type checking
pnpm type-check
```

### Docker

```bash
# Levantar
docker-compose -f docker/docker-compose.yml up -d

# Ver estado
docker-compose -f docker/docker-compose.yml ps

# Ver logs
docker-compose -f docker/docker-compose.yml logs -f

# Detener
docker-compose -f docker/docker-compose.yml down
```

### Prisma

```bash
cd src/backend

# Crear migración
pnpm prisma migrate dev --name nombre_migracion

# Generar cliente
pnpm prisma generate

# Ver base de datos
pnpm prisma studio

# Reset base de datos
pnpm prisma migrate reset
```

---

## Verificación Rápida

Ejecuta esto para verificar que todo está funcionando:

```bash
# Terminal 1: Docker
docker-compose -f docker/docker-compose.yml up -d

# Terminal 2: Desarrollo
pnpm install
cd src/backend && pnpm prisma:generate && cd ../..
pnpm dev

# Terminal 3: Verificar
curl http://localhost:3001/api/health
# Debe retornar: {"status":"ok",...}

curl http://localhost:3000
# Debe retornar HTML
```

---

## Próximas Tareas (Phase 1)

### Semana 1: Autenticación ✋ (Aún no implementado)

- [ ] Login y registro de usuarios
- [ ] JWT token generation
- [ ] OAuth 2.0 integration
- [ ] Password hashing

### Semana 2: CRUD de Restaurantes ⏳

- [ ] Endpoints de restaurantes
- [ ] Admin panel
- [ ] RBAC (role-based access)

### Semana 3: Carta Digital ⏳

- [ ] Menu categories y products
- [ ] Página pública de menú
- [ ] Sistema de órdenes
- [ ] Códigos QR

---

## Troubleshooting

Si encuentras problemas:

1. **Revisar logs:**
   ```bash
   docker-compose -f docker/docker-compose.yml logs
   ```

2. **Consultar documentación:**
   - `docs/TROUBLESHOOTING.md`
   - `docs/DOCKER_STATUS.md`
   - `docs/REGLAS_PROYECTO.md`

3. **Limpiar todo y empezar de nuevo:**
   ```bash
   docker-compose -f docker/docker-compose.yml down -v
   rm -rf node_modules
   pnpm install
   pnpm dev
   ```

---

**Listo para comenzar desarrollo. ¡Buena suerte! 🚀**
