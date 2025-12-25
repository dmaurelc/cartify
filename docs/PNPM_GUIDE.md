# 📦 Guía de pnpm - Cartify

**Versión:** 1.0
**Fecha:** 2025-12-25
**Status:** 🟢 Activo

---

## ¿Por qué pnpm?

El proyecto **Cartify** usa **pnpm** como gestor de paquetes por las siguientes ventajas:

### Beneficios Principales

1. **Performance Superior**
   - Instalación 2-3x más rápida que npm
   - Mejor manejo del caché de dependencias
   - Mejor optimización de memoria

2. **Monorepo Nativo**
   - Soporte integrado para workspaces
   - Mejor aislamiento de módulos
   - Instalación eficiente de dependencias compartidas

3. **Gestión de Dependencias**
   - Previene "dependencias fantasma" (phantom dependencies)
   - Árboles de dependencias más limpios
   - Mejor control de versiones en monorepos

4. **Espacio en Disco**
   - Usa almacenamiento compartido (content-addressable)
   - Ahorra hasta 70% de espacio en node_modules
   - Enlaces duros eficientes

5. **Compatibilidad**
   - 100% compatible con npm
   - Soporta lock file (.pnpm-lock.yaml)
   - Compatible con todas las librerías de npm

---

## Instalación

### Instalación Global (Recomendado)

```bash
# Instalar pnpm globalmente
npm install -g pnpm

# Verificar versión
pnpm --version
# Debe mostrar v8.15.0 o superior
```

### Verificación de Versión Requerida

```bash
# El proyecto requiere pnpm >= 8.0.0
# Verificar que tienes la versión correcta
pnpm --version
```

---

## Comandos Básicos

### Instalación

```bash
# Instalar todas las dependencias
pnpm install

# Instalar una dependencia nueva
pnpm add <nombre-paquete>

# Instalar como dependencia de desarrollo
pnpm add -D <nombre-paquete>

# Instalar una versión específica
pnpm add <nombre-paquete>@<versión>
```

### Scripts

```bash
# Ejecutar todos los scripts 'dev' en workspaces
pnpm dev

# Ejecutar un script en todos los workspaces
pnpm -r <script>

# Ejecutar un script en un workspace específico
pnpm --filter ./src/frontend <script>
pnpm --filter ./src/backend <script>

# Forma abreviada
pnpm -F <workspace> <script>
```

### Ejemplos de Desarrollo

```bash
# Instalar dependencias
pnpm install

# Ejecutar desarrollo en ambos workspaces en paralelo
pnpm dev

# Ejecutar build en todos los workspaces
pnpm build

# Ejecutar tests en todos los workspaces
pnpm test

# Ejecutar linter en todos los workspaces
pnpm lint

# Ejecutar formato en todos los workspaces
pnpm format

# Ejecutar type-check en todos los workspaces
pnpm type-check
```

### Filtros de Workspace

```bash
# Ejecutar comando solo en frontend
pnpm --filter ./src/frontend dev

# Ejecutar comando solo en backend
pnpm --filter ./src/backend dev

# Ejecutar en todos excepto uno
pnpm --filter '!./src/frontend' build

# Ejecutar en dependencias de un workspace
pnpm --filter ./src/frontend --recursive dev
```

---

## Configuración del Proyecto

### pnpm-workspace.yaml

El archivo `pnpm-workspace.yaml` define los workspaces del monorepo:

```yaml
packages:
  - 'src/frontend'
  - 'src/backend'
```

### .npmrc

El archivo `.npmrc` configura el comportamiento de pnpm:

```ini
# Strict peer dependencies checking
strict-peer-dependencies=true

# No shamefully-hoist (recomendado para monorepos)
shamefully-hoist=false

# Engine strict mode
engine-strict=true
```

### package.json

El package.json raíz especifica:

```json
{
  "packageManager": "pnpm@8.15.0",
  "engines": {
    "node": ">=20.0.0",
    "pnpm": ">=8.0.0"
  },
  "workspaces": [
    "src/frontend",
    "src/backend"
  ]
}
```

---

## Estructura de Dependencias

### Package.json en Frontend

```json
{
  "name": "@cartify/frontend",
  "version": "0.0.0",
  "dependencies": {
    "next": "14.2.3",
    "react": "18.3.1",
    // ... más dependencias
  },
  "devDependencies": {
    "typescript": "5.2.2",
    // ... más dev dependencies
  }
}
```

### Package.json en Backend

```json
{
  "name": "@cartify/backend",
  "version": "0.0.0",
  "dependencies": {
    "@nestjs/common": "10.2.10",
    "@prisma/client": "5.7.1",
    // ... más dependencias
  },
  "devDependencies": {
    "@nestjs/cli": "10.2.1",
    // ... más dev dependencies
  }
}
```

---

## Gestión de Dependencias

### Agregar Dependencias

#### En el Workspace Frontend

```bash
# Agregar a frontend
pnpm --filter ./src/frontend add react-query

# Forma abreviada
pnpm -F ./src/frontend add react-query
```

#### En el Workspace Backend

```bash
# Agregar a backend
pnpm --filter ./src/backend add @nestjs/jwt

# Forma abreviada
pnpm -F ./src/backend add @nestjs/jwt
```

#### Como Dependencia de Desarrollo

```bash
# Agregar como devDependency
pnpm -F ./src/frontend add -D @testing-library/react
pnpm -F ./src/backend add -D @nestjs/testing
```

#### Dependencias Compartidas (Monorepo)

```bash
# Typescript en raíz (usado por ambos)
pnpm -w add -D typescript@5.2.2

# ESLint en raíz (usado por ambos)
pnpm -w add -D eslint@8.54.0
```

### Actualizar Dependencias

```bash
# Actualizar todas las dependencias
pnpm update

# Actualizar una dependencia específica
pnpm update <nombre-paquete>

# Actualizar a la última versión disponible
pnpm update <nombre-paquete> --latest

# Actualizar en un workspace específico
pnpm -F ./src/frontend update
```

### Remover Dependencias

```bash
# Remover una dependencia
pnpm remove <nombre-paquete>

# Remover de un workspace específico
pnpm -F ./src/frontend remove <nombre-paquete>

# Remover dependencia de desarrollo
pnpm remove -D <nombre-paquete>
```

---

## Lock File

### pnpm-lock.yaml

El archivo `pnpm-lock.yaml` es similar a `package-lock.json` pero con ventajas:

- **Mejor legibilidad:** Estructura más clara y compacta
- **Mejor performance:** Resolución más rápida
- **Mejor compatibilidad:** Funciona con monorepos nativamente

### Gestión del Lock File

```bash
# Ver contenido del lock file
cat pnpm-lock.yaml

# Regenerar lock file (si está corrompido)
pnpm install --force

# No commitar cambios innecesarios
# El lock file debe estar bajo control de versión
```

---

## Docker Integration

### En Dockerfile

```dockerfile
# Instalar pnpm en la imagen
FROM node:20-alpine as builder

RUN npm install -g pnpm@8.15.0

WORKDIR /app
COPY pnpm-lock.yaml ./
COPY package.json ./

RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build
```

### En docker-compose.yml

```yaml
services:
  backend:
    build:
      context: .
      dockerfile: docker/Dockerfile.backend
    environment:
      - NODE_ENV=development
```

---

## Problemas Comunes

### "No se encuentra el paquete"

```bash
# Solución: Instalar dependencias nuevamente
pnpm install

# Limpiar caché si el problema persiste
pnpm store prune
pnpm install
```

### "Conflicto de versiones de peer dependencies"

```bash
# Ver detalles del conflicto
pnpm install --verbose

# Solución: Actualizar el paquete
pnpm update <paquete>
```

### "pnpm: no encontrado"

```bash
# Solución: Instalar pnpm globalmente
npm install -g pnpm@8.15.0

# Verificar instalación
pnpm --version
```

### "node_modules corrupto"

```bash
# Solución: Limpiar todo y reinstalar
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

---

## Mejores Prácticas

### 1. Usar Workspaces Apropiadamente

```bash
# ✅ CORRECTO: Instalar en workspace específico
pnpm -F ./src/frontend add react

# ❌ INCORRECTO: Instalar en raíz si es solo para un workspace
pnpm add react  # (en raíz)
```

### 2. Mantener package.json Limpio

```bash
# ✅ CORRECTO: Remover dependencias no usadas
pnpm remove <paquete>

# ❌ INCORRECTO: Dejar dependencias obsoletas
```

### 3. Usar Versiones Específicas

```bash
# ✅ CORRECTO: Especificar versión exacta
pnpm add react@18.3.1

# ⚠️ CUIDADO: Usar rangos adecuados
pnpm add react@^18.3.0  # Compatible con 18.x.x
```

### 4. Lock File en Git

```bash
# ✅ SIEMPRE: Incluir pnpm-lock.yaml en Git
git add pnpm-lock.yaml

# ❌ NUNCA: Ignorar el lock file
```

### 5. CI/CD Configuration

```bash
# ✅ CORRECTO: Usar --frozen-lockfile en CI
pnpm install --frozen-lockfile

# ✅ CORRECTO: Especificar versión exacta
pnpm i -g pnpm@8.15.0
```

---

## Performance Tips

### 1. Usar Caché

```bash
# El caché se usa automáticamente
# Para ver dónde está el caché
pnpm store status

# Limpiar el caché si es necesario
pnpm store prune
```

### 2. Instalar en Paralelo

```bash
# pnpm instala en paralelo automáticamente
# No requiere configuración adicional
```

### 3. Monorepo Optimization

```bash
# Usar --frozen-lockfile en desarrollo
pnpm install --frozen-lockfile

# Rápida iteración local
pnpm dev
```

---

## Recursos Adicionales

- [Sitio oficial de pnpm](https://pnpm.io)
- [Documentación de pnpm](https://pnpm.io/es/)
- [pnpm Workspaces](https://pnpm.io/es/workspaces)
- [Comparativa pnpm vs npm](https://pnpm.io/es/benchmarks)

---

## Resumen de Comandos Frecuentes

```bash
# Instalar dependencias
pnpm install

# Desarrollo
pnpm dev

# Build
pnpm build

# Tests
pnpm test

# Lint
pnpm lint

# Format
pnpm format

# Type check
pnpm type-check

# En workspace específico
pnpm -F ./src/frontend dev
pnpm -F ./src/backend dev

# Agregar dependencias
pnpm -F ./src/frontend add <paquete>
pnpm -F ./src/backend add -D <paquete>

# Docker
docker-compose -f docker/docker-compose.yml up
```

---

**Versión:** 1.0
**Actualizado:** 2025-12-25
**Status:** ✅ Completo
