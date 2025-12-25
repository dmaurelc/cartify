# 📌 Estrategia de Versionado Semántico - PDR

## Versión Semántica: MAJOR.MINOR.PATCH

### Formato
- `MAJOR.MINOR.PATCH` (ej: 0.1.0, 0.2.1, 1.0.0)
- `v` como prefijo en tags (ej: v0.1.0)

---

## Definición de Cambios

### 🟥 MAJOR (Cambios Incompatibles)
- **Romper cambios en API REST** (remover endpoints, cambiar estructura de response)
- **Cambios críticos en base de datos** (eliminar tablas, cambiar tipos)
- **Cambios en autenticación/autorización** que afecten clientes
- Para MVP: **NO ESPERADO**

**Ejemplos:**
- Cambiar estructura de autenticación JWT
- Remover un endpoint crítico
- Cambiar completamente el modelo de datos

### 🟨 MINOR (Nuevas Funcionalidades Compatibles)
- **Nuevas features** (compatible hacia atrás)
- **Nuevos endpoints** en API
- **Nuevos campos opcionales** en respuestas
- **Mejoras de performance** significativas
- **Nuevos modelos de BD** (sin eliminar los actuales)

**Ejemplos:**
- v0.1.0: MVP Base + Carta Digital
- v0.2.0: Agregar sistema de pagos
- v0.3.0: Agregar panel de admin
- v0.4.0: Agregar notificaciones por SMS

### 🟩 PATCH (Bug Fixes y Mejoras Menores)
- **Bugs críticos** (seguridad, crash)
- **Bugs menores** en features existentes
- **Optimizaciones de performance**
- **Actualizaciones de dependencias** (sin cambiar funcionalidad)
- **Cambios en documentación**

**Ejemplos:**
- v0.1.1: Corregir validación de email
- v0.1.2: Optimizar carga de imágenes
- v0.2.1: Corregir error en pago con Webpay
- v0.2.2: Actualizar dependencias de seguridad

---

## Criterios de Release para MVP (v0.x.x)

### ✅ Criterios para MINOR (v0.1.0, v0.2.0, etc)
1. Todas las features de la fase **completadas**
2. **Coverage > 70%** en tests
3. **0 bugs críticos** (P0/P1 abiertos)
4. **Performance dentro de SLA**
5. **Documentación actualizada**
6. **No breaking changes** (o documentados)

### ✅ Criterios para PATCH (v0.1.1, v0.1.2, etc)
1. Solo **hotfixes** o correcciones
2. **No nuevas features**
3. **Tests pasando**
4. **Cambios mínimos y focalizados**

---

## Política de Releases

### Draft Release
```
Estado: DRAFT
Uso: Trabajo en progreso
Acciones:
  ✅ Crear automaticamente al crear rama de release
  ✅ Actualizar CHANGELOG mientras se trabaja
  ❌ No publicar aún
```

### Release Candidates (Opcional)
```
v0.1.0-rc1  # Release Candidate 1
v0.1.0-rc2  # Release Candidate 2
```

### Release Final
```
Estado: PUBLISHED
Uso: Versión estable en producción
Acciones:
  ✅ Pasar todos los criterios
  ✅ Merge a main
  ✅ Tag en git
  ✅ Release notes completos
```

---

## Ciclo de Release: Pre-Tag → Tag → Post-Release

### 1️⃣ PRE-TAG (3-5 días antes)

#### Crear rama de release
```bash
git checkout -b release/v0.1.0 develop
```

#### Actualizar versiones
```json
// package.json
{
  "version": "0.1.0"
}

// src/frontend/package.json
{
  "version": "0.1.0"
}

// src/backend/package.json
{
  "version": "0.1.0"
}
```

#### Actualizar CHANGELOG
```markdown
## [0.1.0] - 2025-01-15

### Agregado
- Scaffolding inicial del proyecto
- Landing page básica
- Carrito de compras
- Autenticación JWT
- Integración con PostgreSQL

### Cambiado
- N/A

### Deprecado
- N/A

### Removido
- N/A

### Corregido
- Validación de email

### Seguridad
- Implementar HTTPS
- Bcrypt para contraseñas
```

#### Checklist Pre-Tag
- [ ] Versiones actualizadas en package.json
- [ ] CHANGELOG.md actualizado
- [ ] README.md sincronizado
- [ ] Tests pasan (>70% coverage)
- [ ] Linter pasa (0 errores)
- [ ] Build funciona (npm run build)
- [ ] No hay console.log en producción
- [ ] No hay variables sin usar
- [ ] Documentación API actualizada
- [ ] Deployment checklist completado

---

### 2️⃣ TAG (Crear versión)

#### Crear annotated tag
```bash
git tag -a v0.1.0 -m "Release v0.1.0: MVP Base"
```

#### Que incluye un buen tag
```
Tagger: Daniel Martinez <daniel@example.com>
Date:   Tue Jan 15 10:30:00 2025 -0300

Release v0.1.0: MVP Base

Features:
- Landing page completa
- Carta digital con QR
- Sistema de pedidos
- Autenticación y autorización
- Database schema

Breaking Changes: Ninguno
Risk Level: Bajo
```

#### Verificar tag
```bash
git tag -l -n9  # Ver todos los tags con anotaciones
git show v0.1.0  # Ver detalles del tag
```

#### Crear GitHub Release
```bash
gh release create v0.1.0 \
  --title "v0.1.0 - MVP Base" \
  --generate-notes \
  --draft
```

---

### 3️⃣ POST-RELEASE (Después de publicar)

#### Merge a main
```bash
git checkout main
git pull origin main
git merge --no-ff release/v0.1.0
git push origin main
```

#### Merge back a develop
```bash
git checkout develop
git pull origin develop
git merge --no-ff release/v0.1.0
git push origin develop
```

#### Actualizar versión en develop (SNAPSHOT)
```json
// Cambiar a próxima versión en desarrollo
{
  "version": "0.2.0-SNAPSHOT"
}
```

#### Cleanup
```bash
git branch -d release/v0.1.0
git push origin --delete release/v0.1.0
git push origin v0.1.0  # Push del tag
```

#### Crear milestone para próxima versión
```bash
gh milestone create "v0.2.0" \
  --description "Carrito de compras mejorado"
```

---

## Formato de Release Notes

### Estructura
```markdown
# v0.1.0 - MVP Base (2025-01-15)

## 🎉 Highlights
- Landing page profesional lista para ventas
- Sistema completo de pedidos en tiempo real
- Autenticación segura con JWT

## 🎨 Nuevas Features
- ✨ Landing page con secciones de features, pricing, testimonios
- ✨ Carta digital accesible por código QR
- ✨ Carrito de compras con items y totales
- ✨ Sistema de autenticación JWT + OAuth
- ✨ Dashboard básico para restaurantes

## 🐛 Bugs Corregidos
- Validación de email en formulario de registro
- Manejo de errores en carga de imágenes
- Timeout en requests largas

## 📊 Performance
- FCP: 1.8s (target <2s) ✅
- LCP: 2.3s (target <2.5s) ✅
- CLS: 0.08 (target <0.1) ✅

## 🔒 Seguridad
- HTTPS habilitado
- CSRF protection en formularios
- XSS prevention implementado
- Rate limiting en APIs

## 📦 Dependencias Destacadas
- Next.js 14.0
- NestJS 10.0
- PostgreSQL 15
- Prisma 5.7

## ⚠️ Breaking Changes
- **Ninguno** - primera versión

## 🚀 Instalación
```bash
npm install
docker-compose up -d
npm run db:migrate
npm run dev
```

## 📝 Notas
- Esta es una versión inicial de MVP
- Foco en funcionalidad core, no en optimizaciones
- Próximas versiones: pagos, analytics, multi-tenancy

## 👥 Contribuidores
- Daniel Martinez
- PDR Team

## 📅 Fechas Importantes
- Inicio: 2024-12-25
- Release: 2025-01-15
- Duración: ~3 semanas

## 🙏 Agradecimientos
- Especial gracias al equipo por el feedback
```

---

## Matriz de Decisión: Cuándo hacer MINOR vs PATCH

| Cambio | Tipo | Ejemplo |
|--------|------|---------|
| Nueva tabla en BD | MINOR | Agregar tabla `Cupones` |
| Nuevo campo opcional | PATCH | Agregar `telefono?` a Restaurante |
| Remover campo | MAJOR | Remover `alérgenos` de Producto |
| Nuevo endpoint GET | MINOR | GET /api/v1/restaurants/:id/stats |
| Bug en endpoint existente | PATCH | Validación de email incompleta |
| Nueva feature completa | MINOR | Sistema de cupones (3+ endpoints) |
| Optimización | PATCH | Agregar índices a BD |
| Actualizar library | PATCH | bcrypt de 5.0 a 5.1 |
| Cambiar auth system | MAJOR | JWT a OAuth únicamente |

---

## Herramientas Recomendadas

### Generar CHANGELOG desde Commits
```bash
# Usando conventional-changelog
npm install -g conventional-changelog-cli

# Generar changelog
conventional-changelog -p angular -i CHANGELOG.md -s

# O usando commitizen para commits formateados
npm install -D commitizen
git cz  # En lugar de git commit
```

### Validar Semantic Versioning
```bash
# semver package
npm install semver
node -e "console.log(require('semver').valid('0.1.0'))"  // true
```

### Tags en Git
```bash
# Listar tags
git tag -l

# Listar tags con anotaciones
git tag -l -n

# Eliminar tag local
git tag -d v0.1.0

# Eliminar tag remoto
git push origin --delete v0.1.0

# Checkout a un tag
git checkout v0.1.0
```

---

## Ejemplo Completo: v0.1.0

### Timeline
```
Dec 25: Iniciar Phase 1
Jan 10: Feature freeze (commit final)
Jan 11-14: Testing y correcciones
Jan 15: Release v0.1.0
```

### Cambios Incluidos
- Scaffolding completo
- Landing page
- Carta digital
- Autenticación
- Database schema

### Version Bump
```
Pre-release:  0.0.0-SNAPSHOT
Release:      0.1.0
Post:         0.2.0-SNAPSHOT
```

---

## Referencias

- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging)

---

**Versión:** 1.0
**Creado:** 2025-12-25
**Aplicable:** MVP (v0.x.x) y futuro (v1.0.0+)
