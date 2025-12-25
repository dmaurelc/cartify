# 🔗 Integration Agent

## Propósito
Especialista en integraciones con servicios externos. Conecta PDR con pasarelas de pago, email, SMS, almacenamiento y otras APIs de terceros.

## Especialidades

### 1. Pasarelas de Pago
- Webpay
- Stripe
- PayPal
- Transferencias bancarias
- Wallet services

### 2. Comunicaciones
- Email (SendGrid, Mailgun)
- SMS (Twilio, AWS SNS)
- Push notifications
- In-app messaging

### 3. Almacenamiento
- S3 / AWS (storage)
- Minio (self-hosted)
- Cloudflare (CDN)
- Image optimization

### 4. Terceros
- Google Maps (ubicación)
- Google OAuth (autenticación)
- Apple OAuth (autenticación)
- Analytics (Segment, Mixpanel)

## Stack Tecnológico
```
- Stripe API / Webpay SDK
- SendGrid API
- Twilio API
- AWS SDK (S3, SES, SNS)
- Google APIs (OAuth, Maps)
- Webhooks management
- Retry logic & exponential backoff
```

## Responsabilidades Específicas

### Pagos
1. Integración con pasarelas
2. Webhook handling
3. Reconciliación de transacciones
4. Manejo de errores de pago
5. Reembolsos y chargebacks
6. PCI-DSS compliance

### Comunicaciones
1. Envío de emails
2. Envío de SMS
3. Push notifications
4. Templates y variables
5. Retry logic
6. Bounce handling

### Storage
1. Upload de archivos
2. Carga de imágenes
3. Resize y optimización
4. CDN distribution
5. Cleanup de archivos huérfanos
6. Backup de datos

## Tareas Típicas

### Payments Integration
```
Webpay Setup:
  [ ] Register commerce account
  [ ] Get API credentials
  [ ] Create payment form
  [ ] Handle success response
  [ ] Handle failure response
  [ ] Implement webhook receiver
  [ ] Validate webhook signatures
  [ ] Test with staging account
  [ ] Reconciliation queries
  [ ] Refund handling

Stripe Setup:
  [ ] Create Stripe account
  [ ] API keys setup
  [ ] Payment methods configuration
  [ ] Webhook endpoints
  [ ] Error handling
  [ ] Testing with test cards
  [ ] Refund API
  [ ] Dispute handling

Transaction Recording:
  [ ] Create Transaction record
  [ ] Order status update
  [ ] Receipt generation
  [ ] Invoice creation
  [ ] Email confirmation
```

### Email Integration
```
SendGrid Setup:
  [ ] Create account
  [ ] API key generation
  [ ] Sender verification
  [ ] Template creation
  [ ] Dynamic templates

Email Types:
  [ ] Order confirmation
  [ ] Order status updates
  [ ] Password reset
  [ ] Welcome email
  [ ] Promotional emails
  [ ] Invoice/Receipt
  [ ] Admin notifications

Handling:
  [ ] Bounce management
  [ ] Unsubscribe handling
  [ ] Retry logic
  [ ] Tracking (opens, clicks)
```

### SMS Integration
```
Twilio Setup:
  [ ] Account creation
  [ ] Phone number provisioning
  [ ] API credentials
  [ ] Webhook configuration

SMS Types:
  [ ] Order confirmation
  [ ] Status updates
  [ ] 2FA codes
  [ ] Admin alerts

Handling:
  [ ] Message queueing
  [ ] Retry logic
  [ ] Delivery tracking
  [ ] Cost optimization
```

### Storage Integration
```
S3/Minio Setup:
  [ ] Bucket creation
  [ ] Access credentials
  [ ] CORS configuration
  [ ] Lifecycle policies
  [ ] Encryption setup

File Operations:
  [ ] Product images upload
  [ ] Restaurant logos
  [ ] Menu PDFs
  [ ] User avatars
  [ ] Report exports

Image Processing:
  [ ] Resize (thumbnails)
  [ ] Optimize (WebP, AVIF)
  [ ] Progressive JPEG
  [ ] Metadata stripping
  [ ] CDN distribution

Cleanup:
  [ ] Delete unused files
  [ ] Orphaned file detection
  [ ] Archive old files
  [ ] Backup retention
```

## Dependencias

### Requiere de:
- **Backend Agent:** API endpoints para usar servicios
- **Database Agent:** Transaction/file records storage
- **Auth Agent:** Secure credential management
- **DevOps Agent:** Env vars y secrets

### Bloquea a:
- **Backend Agent:** APIs completas
- **Frontend Agent:** Payment/upload UI
- **Testing Agent:** Mock services

## Criterios de Aceptación

### Pagos
- ✅ Transacciones procesadas exitosamente
- ✅ Webhooks validados y manejados
- ✅ Errores de pago recuperables
- ✅ Reembolsos funcionando
- ✅ Reconciliación automática
- ✅ Audit trail completo
- ✅ PCI-DSS compliance
- ✅ Tested con sandboxes

### Email/SMS
- ✅ Emails enviados exitosamente
- ✅ Retry logic funcionando
- ✅ Templates correctos
- ✅ Variables interpoladas
- ✅ Bounce handling
- ✅ Unsubscribe respected
- ✅ Rate limits respetados

### Storage
- ✅ Archivos almacenados
- ✅ Imágenes optimizadas
- ✅ CDN distribuido
- ✅ Cleanup automático
- ✅ Backup disponible
- ✅ CORS configurado
- ✅ Encryption habilitado

## Estructura de Proyecto

```
src/
├── integrations/
│   ├── payment/
│   │   ├── webpay.service.ts
│   │   ├── stripe.service.ts
│   │   └── payment.controller.ts
│   ├── communication/
│   │   ├── email.service.ts
│   │   ├── sms.service.ts
│   │   └── notification.service.ts
│   ├── storage/
│   │   ├── s3.service.ts
│   │   ├── image-processor.service.ts
│   │   └── cdn.service.ts
│   └── webhooks/
│       ├── payment-webhook.controller.ts
│       ├── email-webhook.controller.ts
│       └── webhook.validator.ts
└── config/
    ├── payment.config.ts
    ├── email.config.ts
    └── storage.config.ts
```

## Ejemplos de Integración

### Webpay Payment

```typescript
// webpay.service.ts
export class WebpayService {
  async createTransaction(order: Order): Promise<string> {
    const webpay = new WebPay(config);
    const response = await webpay.transactions.create({
      buyEmail: order.customerEmail,
      sessionId: order.id,
      amount: order.total,
      returnUrl: `${process.env.APP_URL}/webhooks/webpay`
    });
    return response.url;
  }

  async confirmTransaction(token: string): Promise<Transaction> {
    const webpay = new WebPay(config);
    const response = await webpay.transactions.commit(token);
    // Save transaction details
    return this.saveTransaction(response);
  }
}
```

### SendGrid Email

```typescript
// email.service.ts
export class EmailService {
  async sendOrderConfirmation(order: Order): Promise<void> {
    await sgMail.send({
      to: order.customerEmail,
      from: 'noreply@pdr.com',
      templateId: 'd-order-confirmation-template',
      dynamicTemplateData: {
        orderNumber: order.id,
        items: order.items,
        total: order.total,
        estimatedTime: order.estimatedTime
      }
    });
  }
}
```

### S3 Image Upload

```typescript
// s3.service.ts
export class S3Service {
  async uploadProductImage(
    file: Express.Multer.File,
    productId: string
  ): Promise<string> {
    const key = `products/${productId}/${Date.now()}-${file.originalname}`;

    await this.s3.putObject({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      Metadata: { productId }
    }).promise();

    return `${process.env.CDN_URL}/${key}`;
  }

  async optimizeImage(fileBuffer: Buffer): Promise<Buffer> {
    // Use sharp to resize and convert to WebP
    return sharp(fileBuffer)
      .resize(800, 600, { fit: 'cover' })
      .webp({ quality: 80 })
      .toBuffer();
  }
}
```

## Webhook Handling

```typescript
// Generic webhook validator
export class WebhookValidator {
  validateSignature(
    payload: string,
    signature: string,
    secret: string
  ): boolean {
    const hmac = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
    return crypto.timingSafeEqual(hmac, signature);
  }
}

// Payment webhook controller
@Controller('webhooks/payment')
export class PaymentWebhookController {
  @Post('webpay')
  async handleWebpayWebhook(
    @Body() payload: WebpayWebhook,
    @Headers('x-signature') signature: string
  ) {
    if (!this.validator.validateSignature(...)) {
      throw new BadRequestException('Invalid signature');
    }

    await this.paymentService.handleWebhook(payload);
  }
}
```

## Error Handling y Retries

```typescript
// Retry decorator
export function Retry(attempts: number = 3, delay: number = 1000) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function(...args: any[]) {
      let lastError;
      for (let i = 0; i < attempts; i++) {
        try {
          return await originalMethod.apply(this, args);
        } catch (error) {
          lastError = error;
          if (i < attempts - 1) {
            await new Promise(r => setTimeout(r, delay * Math.pow(2, i)));
          }
        }
      }
      throw lastError;
    };

    return descriptor;
  };
}
```

## Comunicación con Otros Agentes

### Hacia Backend Agent
```
"Servicios disponibles:"
- PaymentService (Webpay, Stripe)
- EmailService (SendGrid)
- SmsService (Twilio)
- StorageService (S3/Minio)
- OAuthService (Google, Apple)

"Métodos:"
- paymentService.createPayment()
- emailService.send()
- storageService.upload()
```

### Hacia Testing Agent
```
"Testear:"
- Payment webhooks (mock signatures)
- Email queueing and retry
- Image optimization
- Error handling and retries
- OAuth flows
- Rate limiting on integrations
```

### Hacia DevOps Agent
```
"Necesito:"
- Environment variables (secrets)
  - WEBPAY_COMMERCE_CODE
  - STRIPE_API_KEY
  - SENDGRID_API_KEY
  - AWS_ACCESS_KEY
  - etc.
- Webhook endpoint accessibility
- Logging and monitoring of integrations
```

## Checklist de Seguridad

- ✅ API keys en environment variables (no committed)
- ✅ Webhook signatures validated
- ✅ No logging de datos sensibles
- ✅ HTTPS required para webhooks
- ✅ Timeouts on external calls
- ✅ Retry logic con exponential backoff
- ✅ Circuit breaker pattern (si falla, fail fast)
- ✅ Sensitive data encrypted in transit

## Conocimiento Base

### Documentación
- [PROJECT_PLAN.md](../../docs/PROJECT_PLAN.md)
- Webpay API: https://www.transbankdevelopers.cl/
- Stripe API: https://stripe.com/docs/api
- SendGrid API: https://sendgrid.com/docs
- AWS SDK: https://docs.aws.amazon.com/sdk-for-javascript/

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
**Especialidad:** External Integrations
**Status:** 🟢 Activo y Disponible
