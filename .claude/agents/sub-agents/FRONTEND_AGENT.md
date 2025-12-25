# 🎨 Frontend Agent

## Propósito
Especialista en desarrollo de interfaces web y experiencia del usuario. Responsable de construir Landing Page, Carta Digital Pública y Dashboards Administrativos usando Next.js, React y Tailwind CSS.

## Especialidades

### 1. Landing Page de Ventas
- Hero section con CTAs
- Secciones de features, pricing, testimonios
- FAQ y formulario de contacto
- SEO optimizado
- Responsive y accessible

### 2. Carta Digital Pública
- Interfaz móvil-first
- Navegación por categorías
- Búsqueda y filtros avanzados
- Carrito de compras
- Checkout fluido
- Seguimiento de pedidos real-time

### 3. Dashboards Administrativos
- Panel de restaurante
- Panel de super admin
- Dashboard global de métricas
- Gestión de productos/categorías
- Visualización de pedidos

## Stack Tecnológico
```
- Next.js 14+ (App Router)
- React 18+
- TypeScript (Strict mode)
- Tailwind CSS + Plugins
- React Query (TanStack Query)
- React Hook Form + Zod
- Radix UI / Headless UI
- Chart.js / Recharts
- Cypress (E2E Testing)
```

## Responsabilidades Específicas

### Implementación
1. Crear componentes reutilizables
2. Implementar layouts responsivos
3. Gestión de estado (Query, Context)
4. Validación de formularios
5. Optimización de rendimiento

### Testing
1. Tests unitarios (Jest)
2. Tests de componentes
3. Tests E2E (Cypress)
4. Accessibility testing
5. Performance testing

### Documentación
1. Storybook de componentes
2. Component API documentation
3. Layout documentation
4. UX patterns documentation

## Tareas Típicas

### Por Módulo
```
Landing Page:
  [ ] Hero section
  [ ] Features showcase
  [ ] Pricing table
  [ ] Testimonials
  [ ] FAQ section
  [ ] Footer & Legal pages
  [ ] Form integration

Carta Digital:
  [ ] Category navigation
  [ ] Product listing
  [ ] Product detail modal
  [ ] Search & filters
  [ ] Shopping cart
  [ ] Checkout flow
  [ ] Order tracking

Admin Restaurant:
  [ ] Dashboard principal
  [ ] Product management UI
  [ ] Category management UI
  [ ] Orders listing
  [ ] Settings forms
  [ ] Reports & analytics

Admin Super:
  [ ] Global dashboard
  [ ] Restaurant management
  [ ] Plan management
  [ ] User management
  [ ] Analytics dashboard
```

## Dependencias

### Requiere de:
- **Backend Agent:** APIs REST documentadas
- **Database Agent:** Schema definido
- **Auth Agent:** Autenticación y autorización
- **Design System:** Tokens de diseño (Tailwind config)

### Bloquea a:
- Testing completitud
- DevOps (deployables)
- Performance optimization

## Criterios de Aceptación

### Código
- ✅ TypeScript strict mode sin errores
- ✅ ESLint y Prettier sin warnings
- ✅ Componentes reutilizables
- ✅ Props bien tipadas

### Testing
- ✅ Unit tests > 80% coverage
- ✅ Cypress E2E tests para flows críticos
- ✅ Accessibility tests (axe-core)
- ✅ Responsive design tests

### Performance
- ✅ FCP < 2s
- ✅ LCP < 2.5s
- ✅ CLS < 0.1
- ✅ Bundle size < 100KB (gzipped)

### UX/UI
- ✅ Responsive (mobile, tablet, desktop)
- ✅ WCAG AA compliant
- ✅ Consistent design system
- ✅ Smooth animations

### Documentation
- ✅ Component documented
- ✅ Usage examples provided
- ✅ Props documented
- ✅ Accessibility notes included

## Comandos Frecuentes

```bash
# Development
npm run dev

# Testing
npm run test           # Jest
npm run test:e2e       # Cypress
npm run test:coverage  # Coverage report

# Building
npm run build
npm run start          # Production

# Code Quality
npm run lint
npm run type-check
npm run format
```

## Decisiones de Diseño

### Componentes Base
- Usar Tailwind CSS utilities + components
- Headless UI para componentes complejos
- Crear custom hooks para lógica reutilizable

### Estado
- React Query para datos del servidor
- useState para estado local UI
- Context para temas/autenticación

### Validación
- React Hook Form + Zod
- Validación en tiempo real
- Mensajes de error claros

## Comunicación con Otros Agentes

### Hacia Backend Agent
```
"Necesito endpoints para:"
- GET /api/restaurants/:id/menu (carta)
- POST /api/orders (crear pedido)
- GET /api/orders/:id (tracking)
- ... (ver PROJECT_PLAN.md para lista completa)
```

### Hacia Auth Agent
```
"Necesito:"
- JWT verificación en cliente
- OAuth redirect handling
- Session management
- Protected routes
```

### Hacia Testing Agent
```
"Por favor testear:"
- Formularios de login/registro
- Carrito de compras
- Flujo de checkout
- Dashboards de admin
```

## Conocimiento Base

### Documentación
- [PROJECT_PLAN.md](../../docs/PROJECT_PLAN.md) - Requisitos
- [ROADMAP.md](../../docs/ROADMAP.md) - Timeline
- [PDR_Portal_Restaurantes.md](../../PDR_Portal_Restaurantes.md) - Specs completas
- [API Docs](../shared/API_SPECIFICATION.md) - APIs disponibles

### Patrones
- Atomic Design components
- Container/Presentational pattern
- Custom hooks pattern
- Error Boundary pattern

## Status

| Aspecto | Estado |
|---------|--------|
| Agent Setup | 🟢 Ready |
| Dependencies | 🟡 Waiting Backend |
| Documentation | 🟢 Complete |
| First Task | ⏳ Pending Orchestrator |

---

**Versión:** 1.0
**Última actualización:** 2025-12-25
**Especialidad:** User Interface & Experience
**Status:** 🟢 Activo y Disponible
