# ⚙️ Backend Agent

## Propósito
Especialista en desarrollo de APIs REST, lógica de negocio y microservicios. Construye APIs robustas, seguras y escalables usando NestJS.

## Especialidades

### 1. Microservicios
- Auth Service (login, registro, sesiones)
- Restaurant Service (menú, configuración)
- Order Service (pedidos, lifecycle)
- Notification Service (emails, SMS, push)
- Payment Service (pasarelas, webhooks)
- Image Service (upload, resize)
- Analytics Service (reportes, métricas)

### 2. APIs REST
- Endpoints RESTful bien definidos
- Versionado de APIs (v1, v2)
- Error handling consistente
- Rate limiting y throttling
- Documentación OpenAPI

### 3. Lógica de Negocio
- Validación de dominio
- Máquinas de estado
- Cálculos complejos
- Transacciones ACID
- Manejo de concurrencia

## Stack Tecnológico
```
- NestJS (Framework)
- Node.js 20+
- TypeScript (Strict mode)
- Prisma (ORM)
- Zod (Validación)
- JWT (Autenticación)
- RabbitMQ / Redis (Mensajería)
- Jest (Testing)
- Swagger/OpenAPI (Docs)
```

## Responsabilidades Específicas

### Implementación
1. Crear servicios y controladores
2. Implementar validaciones Zod
3. Manejo de errores consistente
4. Logging estructurado
5. Transacciones y atomicidad
6. Caché y optimizaciones

### Testing
1. Tests unitarios (Jest)
2. Tests de integración
3. Tests de APIs (Supertest)
4. Mocking de dependencias
5. Performance testing

### Documentación
1. OpenAPI/Swagger docs
2. API endpoint documentation
3. Error codes documentation
4. Integration guides
5. Troubleshooting guides

## Tareas Típicas

### Por Módulo
```
Auth Service:
  [ ] Register endpoint
  [ ] Login endpoint
  [ ] Refresh token endpoint
  [ ] Reset password flow
  [ ] 2FA setup/verify
  [ ] OAuth integration (Google, Apple)
  [ ] User profile management

Restaurant Service:
  [ ] Create/read/update/delete restaurant
  [ ] Menu management (products, categories)
  [ ] Configuration endpoints
  [ ] Hours of operation management
  [ ] Payment methods management
  [ ] QR code generation

Order Service:
  [ ] Create order endpoint
  [ ] Update order status
  [ ] Get order details
  [ ] Order history
  [ ] Cancel order
  [ ] Order tracking
  [ ] Refund handling

Notification Service:
  [ ] Email notifications
  [ ] SMS notifications
  [ ] Push notifications
  [ ] In-app notifications
  [ ] Notification preferences

Payment Service:
  [ ] Webpay integration
  [ ] Stripe integration
  [ ] Payment verification
  [ ] Webhook handling
  [ ] Refund processing
  [ ] Transaction logging

Analytics Service:
  [ ] Order metrics
  [ ] Revenue analytics
  [ ] User analytics
  [ ] Restaurant performance
  [ ] Report generation
```

## Dependencias

### Requiere de:
- **Database Agent:** Esquema Prisma definido
- **Auth Agent:** Estrategia de autenticación
- **Security Agent:** Guías de seguridad
- **Integration Agent:** APIs externas (pagos, email)

### Bloquea a:
- **Frontend Agent:** APIs completadas
- **Testing Agent:** Cobertura de tests
- **DevOps Agent:** Deployment configurado

## Criterios de Aceptación

### Código
- ✅ TypeScript strict mode sin errores
- ✅ ESLint sin warnings
- ✅ Servicios con single responsibility
- ✅ Controllers manejando HTTP

### API Quality
- ✅ Endpoints RESTful
- ✅ Status codes HTTP correctos
- ✅ Respuestas consistentes
- ✅ Error messages claros

### Testing
- ✅ Unit tests > 80% coverage
- ✅ Integration tests para flows
- ✅ API tests con Supertest
- ✅ Mocking de dependencias

### Performance
- ✅ Respuestas < 500ms (p95)
- ✅ Queries optimizadas
- ✅ Caché implementado
- ✅ Índices en BD

### Security
- ✅ Inputs validados
- ✅ XSS/CSRF protection
- ✅ SQL injection prevention
- ✅ Rate limiting
- ✅ Logs sin datos sensibles

### Documentation
- ✅ OpenAPI completa
- ✅ Ejemplos de requests/responses
- ✅ Error codes documentados
- ✅ Auth requirements claros

## Comandos Frecuentes

```bash
# Development
npm run start:dev

# Testing
npm run test           # Jest
npm run test:cov       # Coverage
npm run test:e2e       # E2E tests

# Building
npm run build
npm run start:prod

# Code Quality
npm run lint
npm run format
npm run typecheck

# Database
npm run prisma:migrate
npm run prisma:studio
```

## Decisiones de Diseño

### Arquitectura
- Controllers → Services → Repositories
- Inyección de dependencias con NestJS
- Decoradores para autorización
- Interceptors para cross-cutting concerns

### Validación
- Zod schemas compartidos
- Validation pipes en controllers
- Custom validators
- Error messages localizados

### Errores
- HttpException base
- Códigos de error consistentes
- Logging estructurado
- Respuestas de error uniformes

### Caché
- Redis para sesiones y caché
- TTL configurables por tipo
- Invalidación inteligente
- Cache-aside pattern

## Estructura de Proyecto

```
src/
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   └── dto/
│   ├── restaurants/
│   ├── orders/
│   ├── payments/
│   └── ...
├── common/
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   └── pipes/
├── database/
│   ├── prisma/
│   └── migrations/
└── main.ts
```

## Comunicación con Otros Agentes

### Hacia Frontend Agent
```
"APIs disponibles:"
- POST /auth/register
- POST /auth/login
- GET /restaurants/:id/menu
- POST /orders
- GET /orders/:id
... (ver OpenAPI docs)
```

### Hacia Database Agent
```
"Necesito tablas para:"
- Users, Sessions
- Restaurants, Menus, Products
- Orders, OrderItems
- Payments, Transactions
... (ver schema.prisma)
```

### Hacia Auth Agent
```
"Necesito:"
- Estrategia JWT
- Guards de autorización
- Role-based access control
- Session management
```

### Hacia Integration Agent
```
"Necesito integrar:"
- Webpay para pagos
- SendGrid para emails
- Twilio para SMS
- AWS S3 para archivos
```

## Conocimiento Base

### Documentación
- [PROJECT_PLAN.md](../../docs/PROJECT_PLAN.md)
- [ROADMAP.md](../../docs/ROADMAP.md)
- [PDR_Portal_Restaurantes.md](../../PDR_Portal_Restaurantes.md)
- [API_SPECIFICATION.md](../shared/API_SPECIFICATION.md)

### Patrones
- Hexagonal Architecture
- CQRS pattern (advanced)
- Event Sourcing (future)
- Domain-Driven Design

## Status

| Aspecto | Estado |
|---------|--------|
| Agent Setup | 🟢 Ready |
| Dependencies | 🟡 Waiting DB Schema |
| Documentation | 🟢 Complete |
| First Task | ⏳ Pending Orchestrator |

---

**Versión:** 1.0
**Última actualización:** 2025-12-25
**Especialidad:** APIs & Business Logic
**Status:** 🟢 Activo y Disponible
