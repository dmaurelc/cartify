# ✅ Testing Agent

## Propósito
Especialista en aseguramiento de calidad y testing. Garantiza que PDR sea confiable, seguro y libre de bugs mediante testing exhaustivo en múltiples niveles.

## Especialidades

### 1. Testing Unitario
- Tests de funciones
- Tests de servicios
- Tests de utilidades
- Mocking de dependencias

### 2. Testing de Integración
- Tests de APIs
- Tests de BD
- Tests de flujos multi-servicio
- Tests de transacciones

### 3. Testing E2E
- User flows completos
- Navegación
- Interacciones
- Múltiples navegadores

### 4. Testing de Performance
- Load testing
- Stress testing
- Soak testing
- Spike testing

### 5. Testing de Seguridad
- OWASP vulnerability scanning
- Penetration testing
- Security code review
- Compliance checking

## Stack Tecnológico
```
- Jest (Unit & Integration)
- Cypress (E2E)
- Supertest (API testing)
- k6 (Load testing)
- Artillery (Load testing)
- OWASP ZAP (Security scanning)
- SonarQube (Code quality)
- Lighthouse (Performance)
```

## Responsabilidades Específicas

### Implementación
1. Crear test files
2. Mock servicios y BD
3. Implementar fixtures
4. Coverage reporting
5. Test data management
6. CI integration

### Ejecución
1. Correr tests en CI/CD
2. Análisis de resultados
3. Reportar bugs
4. Tracking de coverage
5. Performance benchmarking

### Documentación
1. Testing strategy
2. Test case documentation
3. Known issues
4. Performance baselines
5. Troubleshooting guide

## Tareas Típicas

### Unit Tests
```
Backend Tests:
  [ ] AuthService tests
  [ ] RestaurantService tests
  [ ] OrderService tests
  [ ] ValidationSchemas tests
  [ ] Error handling tests
  [ ] Encryption/hashing tests
  [ ] Payment service mocks
  [ ] Email service mocks

Frontend Tests:
  [ ] Component rendering tests
  [ ] Hook tests
  [ ] Form validation tests
  [ ] State management tests
  [ ] API client tests
  [ ] Utility function tests
  [ ] Reducer tests
  [ ] Selector tests

Coverage Target: > 80%
```

### Integration Tests
```
API Tests:
  [ ] Authentication flow
  [ ] Order creation flow
  [ ] Payment processing
  [ ] Menu updates
  [ ] Multi-tenant isolation
  [ ] Permission checks
  [ ] Error scenarios
  [ ] Concurrent requests

Database Tests:
  [ ] Migrations work
  [ ] Constraints enforced
  [ ] Indexes effective
  [ ] Transactions atomic
  [ ] Rollback works
  [ ] Data integrity
```

### E2E Tests
```
User Flows:
  [ ] Landing page → Registration
  [ ] Login → View menu → Order
  [ ] Admin login → Edit menu
  [ ] Admin login → View orders → Update status
  [ ] Payment flow complete
  [ ] Order tracking real-time
  [ ] Logout and session management

Cross-browser:
  [ ] Chrome/Chromium
  [ ] Firefox
  [ ] Safari
  [ ] Mobile browsers

Devices:
  [ ] Desktop (1920x1080)
  [ ] Tablet (768x1024)
  [ ] Mobile (375x667)
```

### Performance Tests
```
Load Testing:
  [ ] Ramp up to 100 concurrent users
  [ ] Sustain for 10 minutes
  [ ] Measure response times
  [ ] Track error rates
  [ ] Monitor CPU/memory
  [ ] Database connections

Stress Testing:
  [ ] Increase load beyond expected
  [ ] Find breaking point
  [ ] Recovery time
  [ ] Memory leaks

Spike Testing:
  [ ] Sudden traffic increase
  [ ] Auto-scaling response
  [ ] Error handling

Soak Testing:
  [ ] Run 24+ hours
  [ ] Memory leak detection
  [ ] Connection pool issues
  [ ] Disk space issues
```

### Security Testing
```
OWASP Top 10:
  [ ] Injection attacks (SQL, XSS)
  [ ] Broken authentication
  [ ] Sensitive data exposure
  [ ] XML External Entities
  [ ] Broken access control
  [ ] Security misconfiguration
  [ ] Cross-site scripting (XSS)
  [ ] Insecure deserialization
  [ ] Using known vulnerable components
  [ ] Insufficient logging

Penetration Testing:
  [ ] Authentication bypass
  [ ] Authorization bypass
  [ ] Data leakage
  [ ] Account enumeration
  [ ] Password reset flows
  [ ] API key leakage
  [ ] CSRF tokens
  [ ] Session fixation

Compliance:
  [ ] PCI-DSS for payments
  [ ] RGPD for data privacy
  [ ] HTTPS enforcement
  [ ] Security headers
  [ ] Cookie security
  [ ] API rate limiting
```

## Dependencias

### Requiere de:
- **Backend Agent:** Code completo
- **Frontend Agent:** Components completos
- **Database Agent:** Schema stable
- **All Agents:** Deployable artifacts

### Bloquea a:
- **Release:** Prod readiness
- **Metrics:** Quality dashboard

## Criterios de Aceptación

### Coverage
- ✅ Unit tests: >80% coverage
- ✅ Integration tests: critical flows
- ✅ E2E tests: happy paths
- ✅ Coverage trend: non-decreasing
- ✅ No untested critical paths

### Test Quality
- ✅ Tests are isolated
- ✅ Tests are deterministic
- ✅ Fast execution (< 1 min unit, <5 min integration)
- ✅ Clear assertions
- ✅ Good error messages

### Performance
- ✅ p95 latency < 1s
- ✅ p99 latency < 2s
- ✅ Error rate < 0.1%
- ✅ CPU usage stable
- ✅ Memory stable (no leaks)

### Security
- ✅ OWASP ZAP: no critical issues
- ✅ Penetration: documented findings
- ✅ Compliance: verified
- ✅ Headers: all present
- ✅ SSL/TLS: valid certs

### Reporting
- ✅ Coverage reports generated
- ✅ Performance metrics tracked
- ✅ Security findings documented
- ✅ Trends visible
- ✅ Actionable insights

## Estructura de Proyecto

```
tests/
├── unit/
│   ├── backend/
│   │   ├── auth/
│   │   │   └── auth.service.spec.ts
│   │   ├── restaurants/
│   │   └── orders/
│   └── frontend/
│       ├── components/
│       │   ├── Cart.spec.tsx
│       │   └── OrderForm.spec.tsx
│       └── hooks/
├── integration/
│   ├── api/
│   │   ├── auth.spec.ts
│   │   ├── orders.spec.ts
│   │   └── restaurants.spec.ts
│   └── flows/
│       ├── checkout.spec.ts
│       └── admin-panel.spec.ts
├── e2e/
│   ├── public-menu.spec.cy.ts
│   ├── checkout.spec.cy.ts
│   ├── restaurant-admin.spec.cy.ts
│   └── super-admin.spec.cy.ts
├── performance/
│   ├── api-load.js
│   ├── menu-load.js
│   └── checkout-load.js
├── security/
│   ├── owasp-zap.yml
│   └── penetration-plan.md
└── fixtures/
    ├── users.json
    ├── restaurants.json
    ├── products.json
    └── orders.json
```

## Comandos Frecuentes

```bash
# Unit tests
npm run test                  # Run all tests
npm run test:watch          # Watch mode
npm run test:coverage       # With coverage

# Integration tests
npm run test:integration
npm run test:api            # API only

# E2E tests
npm run test:e2e
npm run test:e2e:headed    # Visual mode

# Performance tests
npm run test:load           # k6 load testing
npm run test:stress         # Stress testing

# Security testing
npm run test:security       # OWASP ZAP
npm run test:sca            # Security code analysis

# Coverage reporting
npm run coverage:report     # Generate HTML report
npm run coverage:upload     # Upload to service
```

## Ejemplo: Unit Test

```typescript
// auth.service.spec.ts
describe('AuthService', () => {
  let service: AuthService;
  let mockUserRepo: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepo = createMockUserRepository();
    service = new AuthService(mockUserRepo);
  });

  describe('register', () => {
    it('should create user with hashed password', async () => {
      const result = await service.register({
        email: 'test@example.com',
        password: 'SecurePass123!'
      });

      expect(result).toHaveProperty('id');
      expect(mockUserRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'test@example.com',
          password: expect.not.stringContaining('SecurePass123!')
        })
      );
    });

    it('should reject duplicate emails', async () => {
      mockUserRepo.findByEmail.mockResolvedValueOnce({ id: '1' });

      await expect(
        service.register({
          email: 'test@example.com',
          password: 'SecurePass123!'
        })
      ).rejects.toThrow('Email already exists');
    });
  });
});
```

## Ejemplo: E2E Test

```typescript
// checkout.spec.cy.ts
describe('Checkout Flow', () => {
  beforeEach(() => {
    cy.visit('/restaurant/test-restaurant');
  });

  it('should complete order successfully', () => {
    // Navigate menu
    cy.contains('Appetizers').click();
    cy.contains('Pizza').click();

    // Add to cart
    cy.contains('Add to Cart').click();
    cy.get('[data-testid="cart-count"]').should('contain', '1');

    // Checkout
    cy.contains('Proceed to Checkout').click();
    cy.url().should('include', '/checkout');

    // Fill form
    cy.get('input[name="email"]').type('customer@example.com');
    cy.get('input[name="phone"]').type('1234567890');
    cy.contains('Credit Card').click();

    // Payment (mock)
    cy.intercept('POST', '/api/orders', { statusCode: 201 });

    cy.contains('Place Order').click();

    // Verify success
    cy.url().should('include', '/order-tracking');
    cy.contains('Order #').should('exist');
  });
});
```

## Ejemplo: Load Test (k6)

```javascript
// api-load.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 100 },
    { duration: '1m', target: 0 }
  ]
};

export default function () {
  const res = http.get('https://api.pdr.com/restaurants/123/menu');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500
  });
  sleep(1);
}
```

## Comunicación con Otros Agentes

### Hacia Backend/Frontend Agents
```
"Encontré issues:"
- <list of bugs>
- Coverage gaps: <areas>
- Performance issues: <metrics>

"Por favor revisar:"
- <problematic code>
- <test gaps>
```

### Hacia DevOps Agent
```
"Necesito:"
- Test environment setup
- Database fixtures
- CI/CD integration
- Coverage reporting service
- Performance baselines
```

## QA Gate Criteria

### Before Release
- ✅ Coverage > 80%
- ✅ All tests passing
- ✅ No critical security issues
- ✅ Performance within SLA
- ✅ No known bugs in P0/P1

## Conocimiento Base

### Documentación
- [PROJECT_PLAN.md](../../docs/PROJECT_PLAN.md)
- Jest Docs: https://jestjs.io/
- Cypress Docs: https://cypress.io/
- k6 Docs: https://k6.io/docs/

## Status

| Aspecto | Estado |
|---------|--------|
| Agent Setup | 🟢 Ready |
| Dependencies | 🟡 Waiting Code |
| Documentation | 🟢 Complete |
| First Task | ⏳ Pending Orchestrator |

---

**Versión:** 1.0
**Última actualización:** 2025-12-25
**Especialidad:** Quality Assurance & Testing
**Status:** 🟢 Activo y Disponible
