# 📡 API Specification Template

## Base Configuration
```
Base URL: https://api.pdr.com/v1
Authentication: Bearer {JWT_TOKEN}
Content-Type: application/json
Response Format: JSON
```

## Standard Response Format

### Success Response (2xx)
```json
{
  "success": true,
  "data": { /* payload */ },
  "meta": {
    "timestamp": "2025-12-25T12:00:00Z",
    "version": "1.0"
  }
}
```

### Error Response (4xx, 5xx)
```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Descriptive error message",
    "details": [
      {
        "field": "email",
        "issue": "Invalid email format"
      }
    ]
  },
  "meta": {
    "timestamp": "2025-12-25T12:00:00Z",
    "requestId": "req_abc123"
  }
}
```

## Error Codes

```
Authentication Errors:
  - 401_UNAUTHORIZED: Token missing or invalid
  - 401_EXPIRED_TOKEN: Token expired
  - 401_INVALID_CREDENTIALS: Wrong email/password

Authorization Errors:
  - 403_FORBIDDEN: Insufficient permissions
  - 403_TENANT_MISMATCH: Accessing wrong tenant

Validation Errors:
  - 400_INVALID_INPUT: Request body validation failed
  - 400_REQUIRED_FIELD: Missing required field
  - 400_INVALID_FORMAT: Invalid format (email, date, etc)

Resource Errors:
  - 404_NOT_FOUND: Resource not found
  - 409_CONFLICT: Resource already exists
  - 410_GONE: Resource deleted

Rate Limiting:
  - 429_TOO_MANY_REQUESTS: Rate limit exceeded

Server Errors:
  - 500_INTERNAL_ERROR: Unexpected server error
  - 503_SERVICE_UNAVAILABLE: Service temporarily down
```

## Standard Headers

### Request Headers
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
Accept: application/json
Accept-Language: es-ES (optional)
X-Request-ID: unique-request-id (optional)
```

### Response Headers
```
Content-Type: application/json
X-Request-ID: unique-request-id
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1640409600
Cache-Control: private, max-age=300 (si aplica)
```

## Common Endpoints Pattern

### Endpoints por Módulo

#### Auth Module
```
POST   /auth/register
POST   /auth/login
POST   /auth/refresh
POST   /auth/logout
POST   /auth/forgot-password
POST   /auth/reset-password
POST   /auth/verify-email
GET    /auth/me
PUT    /auth/profile
```

#### Restaurants Module
```
GET    /restaurants                    # List (paginated)
POST   /restaurants                    # Create
GET    /restaurants/:id                # Get one
PUT    /restaurants/:id                # Update
DELETE /restaurants/:id                # Delete

GET    /restaurants/:id/menu           # Get menu
GET    /restaurants/:id/products       # List products
POST   /restaurants/:id/products       # Create product
PUT    /restaurants/:id/products/:pid  # Update product
DELETE /restaurants/:id/products/:pid  # Delete product

GET    /restaurants/:id/categories     # List categories
POST   /restaurants/:id/categories     # Create category
PUT    /restaurants/:id/categories/:cid # Update category
DELETE /restaurants/:id/categories/:cid # Delete category
```

#### Orders Module
```
POST   /orders                         # Create order
GET    /orders                         # List (paginated, filtered)
GET    /orders/:id                     # Get order details
PUT    /orders/:id/status              # Update order status
DELETE /orders/:id                     # Cancel order
GET    /orders/:id/tracking            # Real-time tracking

POST   /orders/:id/payment             # Initiate payment
GET    /orders/:id/payment/status      # Check payment status
```

#### Payments Module
```
POST   /payments/transactions          # Create transaction
GET    /payments/transactions/:id      # Get transaction
GET    /payments/transactions          # List (paginated)
POST   /payments/refunds               # Create refund
GET    /payments/webhooks/status       # Webhook status
```

## Pagination

```
Query Parameters:
  - page: number (default: 1)
  - limit: number (default: 20, max: 100)
  - sort: string (field:asc|desc)
  - search: string (full-text search)

Response:
{
  "data": [ /* items */ ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8,
    "hasMore": true
  }
}
```

## Filtering

```
Query Examples:
  GET /orders?status=pending,confirmed
  GET /orders?createdAt[gte]=2025-01-01&createdAt[lte]=2025-12-31
  GET /products?price[gt]=100&price[lt]=500
  GET /restaurants?active=true

Operators:
  [eq]  = equal (default)
  [ne]  = not equal
  [gt]  = greater than
  [gte] = greater than or equal
  [lt]  = less than
  [lte] = less than or equal
  [in]  = in array
  [nin] = not in array
```

## Authentication Flow

```
1. Register
POST /auth/register
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "John Doe"
}

2. Login
POST /auth/login
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response:
{
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "expiresIn": 900
  }
}

3. Use Token
Authorization: Bearer eyJhbGc...

4. Refresh (before expiry)
POST /auth/refresh
{
  "refreshToken": "eyJhbGc..."
}

5. Logout
POST /auth/logout
Authorization: Bearer eyJhbGc...
```

## Multi-Tenant Isolation

```
Every endpoint requiring tenant context includes restaurant_id:
- Path: /restaurants/:id/...
- Query: ?restaurantId=...
- Body: { "restaurantId": "..." }

Backend validates:
1. User belongs to restaurant
2. Request restaurantId matches user's restaurant
3. Returns 403 if tenant mismatch
```

## Rate Limiting

```
Public endpoints:
  - 100 requests / minute per IP

Authenticated endpoints:
  - 1000 requests / minute per user

Payment endpoints:
  - 10 requests / minute per user

Search endpoints:
  - 30 requests / minute per user

Response headers indicate limits:
  X-RateLimit-Limit: 1000
  X-RateLimit-Remaining: 999
  X-RateLimit-Reset: 1640409600
```

## Webhook Structure

```
POST {webhookUrl}

Headers:
  X-Signature: HMAC-SHA256 signature
  X-Timestamp: unix timestamp
  Content-Type: application/json

Body:
{
  "event": "order.created",
  "timestamp": 1640409600,
  "data": { /* event data */ },
  "id": "evt_123abc"
}

Signature calculation:
  payload = timestamp + "." + body
  signature = HMAC-SHA256(payload, secret)
```

## Versioning Strategy

```
Current Version: v1
Base URL: /api/v1/

Breaking changes:
  - New major version (v2)
  - Old version maintained for 6 months
  - Migration guide provided

Non-breaking changes:
  - Added to v1
  - Optional parameters
  - New fields in responses

Deprecation:
  - Announced 3 months before removal
  - X-Deprecated-Warning header
```

## Common DTOs

### Pagination Request
```typescript
interface PaginationQuery {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
}
```

### Pagination Response
```typescript
interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasMore: boolean;
  };
}
```

### Error Response
```typescript
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Array<{
      field: string;
      issue: string;
    }>;
  };
  meta: {
    timestamp: string;
    requestId: string;
  };
}
```

---

**Version:** 1.0
**Last Updated:** 2025-12-25
**Status:** Template - Completar con endpoints específicos
