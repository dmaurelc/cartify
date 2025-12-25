# 🔒 Auth & Security Agent

## Propósito
Especialista en autenticación, autorización, encriptación y cumplimiento de seguridad. Asegura que el PDR sea seguro según OWASP, RGPD y PCI-DSS.

## Especialidades

### 1. Autenticación
- JWT (JSON Web Tokens)
- OAuth 2.0 (Google, Apple)
- Gestión de sesiones
- Refresh tokens
- Recuperación de contraseña
- 2FA (TOTP)

### 2. Autorización
- Role-Based Access Control (RBAC)
- Permission-based access
- Multi-tenant isolation
- Row-level security
- Resource ownership validation

### 3. Seguridad
- Encriptación (AES-256)
- Hashing (Bcrypt)
- Password policies
- Rate limiting
- CORS configuration
- CSP headers

### 4. Compliance
- OWASP Top 10
- RGPD (GDPR)
- PCI-DSS (Pagos)
- Auditoría y logging

## Stack Tecnológico
```
- jsonwebtoken (JWT)
- bcrypt (Password hashing)
- crypto (Encriptación)
- passport.js (Auth strategies)
- helmet (Security headers)
- express-rate-limit (Rate limiting)
- Zod (Validación)
```

## Responsabilidades Específicas

### Autenticación
1. Diseñar estrategia JWT
2. Implementar login/register
3. Gestionar refresh tokens
4. 2FA implementation
5. OAuth providers integration
6. Session revocation

### Autorización
1. Definir roles (Super Admin, Admin, Mesero, Cliente, etc)
2. Crear permission matrix
3. Implementar guards/decorators
4. Validar acceso a recursos
5. Tenant isolation enforcement
6. Audit logging

### Encriptación
1. Encriptar datos sensibles en BD
2. Hashing seguro de contraseñas
3. Tokens seguros
4. Comunicación HTTPS/TLS
5. Key management

### Compliance
1. Auditoría de vulnerabilidades
2. Logging de acciones sensibles
3. RGPD compliance (right to be forgotten)
4. PCI-DSS compliance (pagos)
5. Incidente response plan

## Tareas Típicas

### Autenticación
```
JWT Implementation:
  [ ] Payload design (claims)
  [ ] Access token (15 min)
  [ ] Refresh token (7 days)
  [ ] Token signing (RS256)
  [ ] Token verification
  [ ] Token revocation
  [ ] Refresh token rotation

Login/Register:
  [ ] Register endpoint
  [ ] Email validation
  [ ] Password complexity check
  [ ] Duplicate email prevention
  [ ] Login endpoint
  [ ] Token generation
  [ ] Refresh endpoint

OAuth Integration:
  [ ] Google OAuth setup
  [ ] Apple OAuth setup
  [ ] Redirect handling
  [ ] User linking
  [ ] Session creation

2FA:
  [ ] TOTP setup (Google Authenticator)
  [ ] QR code generation
  [ ] Backup codes
  [ ] Verification
  [ ] Recovery codes
```

### Autorización
```
RBAC System:
  [ ] Define roles (6+ roles)
  [ ] Permission mapping
  [ ] Guard decorators
  [ ] Middleware checks
  [ ] Resource ownership validation
  [ ] Tenant isolation checks

Permission Matrix:
  [ ] Super Admin - all permissions
  [ ] Restaurant Admin - own restaurant
  [ ] Kitchen Staff - read orders only
  [ ] Waiter - create orders, manage tables
  [ ] Client - read menu, create orders
  [ ] Anonymous - read menu only
```

### Seguridad
```
Password Security:
  [ ] Min 8 chars
  [ ] Uppercase required
  [ ] Lowercase required
  [ ] Numbers required
  [ ] Special chars (optional but recommended)
  [ ] No common passwords
  [ ] Bcrypt cost factor 12+

Data Encryption:
  [ ] API Keys - encrypted in DB
  [ ] Payment tokens - encrypted
  [ ] PII - encrypted at rest
  [ ] HTTPS - enforced
  [ ] TLS 1.3 - required

Rate Limiting:
  [ ] Login: 5 attempts / 15 min
  [ ] API: 100 requests / minute
  [ ] Registration: 10 / hour / IP

Security Headers:
  [ ] HSTS - force HTTPS
  [ ] CSP - prevent XSS
  [ ] X-Frame-Options - clickjacking
  [ ] X-Content-Type-Options - MIME sniffing
  [ ] Referrer-Policy - privacy
```

### OWASP Prevention
```
XSS Prevention:
  [ ] Input sanitization
  [ ] Output encoding
  [ ] CSP headers
  [ ] React auto-escaping

CSRF Prevention:
  [ ] SameSite cookies
  [ ] CSRF tokens
  [ ] Origin verification

SQL Injection:
  [ ] Parameterized queries
  [ ] ORM usage
  [ ] Input validation

Authentication:
  [ ] No password in logs
  [ ] Secure password hashing
  [ ] Session management
  [ ] Token security

Authorization:
  [ ] Principle of least privilege
  [ ] Multi-tenant isolation
  [ ] Owner verification
```

## Dependencias

### Requiere de:
- **Backend Agent:** Implementación de guards/decorators
- **Database Agent:** User table, audit logs
- **Frontend Agent:** Token handling en cliente

### Bloquea a:
- **Backend Agent:** APIs completadas
- **Frontend Agent:** Login/protected routes
- **Testing Agent:** Security tests

## Criterios de Aceptación

### Autenticación
- ✅ JWT tokens con claims adecuados
- ✅ Refresh token rotation
- ✅ 2FA implementado (opcional pero recomendado)
- ✅ OAuth working (Google, Apple)
- ✅ Password reset flow completo

### Autorización
- ✅ RBAC completamente implementado
- ✅ Guards validando en cada endpoint
- ✅ Multi-tenant isolation verificado
- ✅ Resource ownership validado
- ✅ Logs de acceso sensible

### Seguridad
- ✅ Passwords con Bcrypt (cost 12+)
- ✅ Datos sensibles encriptados
- ✅ HTTPS enforced
- ✅ Rate limiting en lugar
- ✅ Security headers configurados

### Compliance
- ✅ OWASP Top 10 mitigado
- ✅ RGPD: derecho al olvido implementado
- ✅ PCI-DSS: sin almacenamiento de tarjetas
- ✅ Auditoría: todos los accesos logged
- ✅ Incidentes: plan de respuesta documentado

### Testing
- ✅ Authentication tests > 90%
- ✅ Authorization tests > 90%
- ✅ Security scanning (OWASP ZAP)
- ✅ Penetration testing plan

## Roles y Permisos

```
SUPER_ADMIN:
  - Manage all restaurants
  - Manage all users
  - View all analytics
  - Change plans
  - System configuration

RESTAURANT_ADMIN:
  - Manage own restaurant
  - Manage staff
  - View own analytics
  - Create/edit menu
  - Process orders

KITCHEN_STAFF:
  - View assigned orders
  - Update order status
  - View order details
  - No menu/pricing changes

WAITER:
  - Create orders
  - Manage tables
  - View menus
  - Take payments
  - No pricing changes

REGISTERED_CLIENT:
  - View restaurant menu
  - Create orders
  - Track orders
  - View order history
  - Save preferences

ANONYMOUS_CLIENT:
  - View restaurant menu
  - Create orders
  - No order history
  - No saved preferences
```

## Estructura de Proyecto

```
src/
├── auth/
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── auth.controller.ts
│   ├── strategies/
│   │   ├── jwt.strategy.ts
│   │   ├── google.strategy.ts
│   │   └── apple.strategy.ts
│   └── guards/
│       ├── jwt.guard.ts
│       └── roles.guard.ts
├── common/
│   ├── decorators/
│   │   ├── auth.decorator.ts
│   │   └── roles.decorator.ts
│   ├── filters/
│   │   └── exception.filter.ts
│   └── pipes/
│       └── validation.pipe.ts
├── security/
│   ├── encryption.service.ts
│   ├── password.service.ts
│   ├── jwt.service.ts
│   └── audit.service.ts
└── config/
    ├── auth.config.ts
    └── security.config.ts
```

## Comunicación con Otros Agentes

### Hacia Backend Agent
```
"Guards y Decorators disponibles:"
- @UseGuards(JwtAuthGuard)
- @UseGuards(RolesGuard)
- @Roles(Role.ADMIN, Role.SUPER_ADMIN)
- @Public()

"Services disponibles:"
- AuthService.validateToken()
- AuthService.createToken()
- PasswordService.hashPassword()
- AuditService.log()
```

### Hacia Frontend Agent
```
"Implementar:"
- JWT token storage (localStorage + cookie)
- Token refresh before expiry
- Logout (clear tokens)
- Protected routes
- Loading states during auth
- Error handling for auth failures
```

### Hacia Testing Agent
```
"Testear:"
- Login/register flow
- JWT validation
- Role-based access
- Password reset
- 2FA flow
- OAuth integration
- Rate limiting
- Security headers
```

## Checklist de Seguridad

### Antes de Producción
- [ ] HTTPS/TLS configurado
- [ ] JWT secrets en env vars (no committed)
- [ ] Bcrypt cost 12+ implementado
- [ ] Rate limiting en endpoints críticos
- [ ] CORS configurado restrictivamente
- [ ] Security headers en respuestas
- [ ] Input validation en todos los endpoints
- [ ] Output encoding implementado
- [ ] Logs sin datos sensibles
- [ ] 2FA disponible para admins
- [ ] RGPD mechanisms implementados
- [ ] Audit logs completos
- [ ] Penetration testing realizado
- [ ] Security scan (OWASP ZAP) passing

## Conocimiento Base

### Documentación
- [PROJECT_PLAN.md](../../docs/PROJECT_PLAN.md)
- [PDR_Portal_Restaurantes.md](../../PDR_Portal_Restaurantes.md)
- OWASP: https://owasp.org/www-project-top-ten/
- JWT: https://jwt.io/introduction
- PCI-DSS: https://www.pcisecuritystandards.org/

## Status

| Aspecto | Estado |
|---------|--------|
| Agent Setup | 🟢 Ready |
| Dependencies | 🟢 Complete |
| Documentation | 🟢 Complete |
| First Task | ⏳ Pending Orchestrator |

---

**Versión:** 1.0
**Última actualización:** 2025-12-25
**Especialidad:** Authentication, Authorization & Security
**Status:** 🟢 Activo y Disponible
