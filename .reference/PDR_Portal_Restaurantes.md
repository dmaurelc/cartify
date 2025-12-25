# PDR - Portal Digital de Restaurantes

## Documento de Requisitos Técnicos y Especificaciones de Arquitectura

---

## 1. Resumen Ejecutivo

### 1.1 Visión del Producto

El Portal Digital de Restaurantes es una plataforma web integral diseñada para transformar la experiencia de pedidos en restaurantes físicos mediante tecnología de códigos QR y comercio electrónico. La solución permite a los establecimientos gastronómicos crear y gestionar sus cartas digitales de manera autónoma, mientras los clientes pueden visualizar menús, realizar pedidos y gestionar pagos de forma remota o desde el local mediante el escaneo de códigos QR. El sistema incorpora tres componentes principales diferenciados: una landing page corporativa para la comercialización del producto, un panel de administración de alto nivel para super administradores, y un panel de gestión específico para cada restaurante cliente. La arquitectura técnica se fundamenta en Next.js como framework principal, Tailwind CSS para el diseño de interfaces responsivas, y Docker para la containerización y despliegue escalable de servicios.

El modelo de negocio propuesto es SaaS (Software as a Service), donde los restaurantes pagan una suscripción mensual o anual según el plan seleccionado. Los planes incluyen diferentes niveles de funcionalidad, desde opciones básicas con carta digital limitada hasta planes premium con análisis avanzado, dominio personalizado, y soporte prioritario. Este enfoque permite escalar el negocio mientras se ofrece flexibilidad a restaurantes de diferentes tamaños y necesidades.

### 1.2 Problema que Resuelve

Los restaurantes tradicionales enfrentan múltiples desafíos en la gestión de sus cartas físicas, incluyendo costos de impresión recurrentes, dificultad para actualizar precios o disponibilidad de platos, y la falta de integración con sistemas de pedidos digitales. Cada cambio en el menú requiere reimpresión de materiales, generando gastos acumulativos y demoras en la actualización. Además, los camareros deben memorizar información sobre ingredientes, alérgenos y disponibilidades, lo que puede generar errores y experiencias negativas para los clientes.

Los clientes, por su parte, experimentan limitaciones al no poder visualizar el menú completo antes de llegar al establecimiento, dificultad para personalizar pedidos según preferencias dietéticas, y tiempos de espera prolongados en la atención. La ausencia de información clara sobre alérgenos y composición de platos representa un problema adicional para personas con restricciones alimentarias. Esta plataforma aborda ambas problemáticas mediante una solución unificada que digitaliza completamente la experiencia de menú digital y pedidos, eliminando fricciones operativas y mejorando la satisfacción del cliente final mediante autonomía y transparencia.

### 1.3 Alcance del Proyecto

El alcance del proyecto abarca el desarrollo completo de una plataforma SaaS multiinquilino, donde cada restaurante opera como un tenant independiente con su propia configuración, datos y personalización visual. El sistema soporta funcionalidades de lectura de carta digital con búsqueda y filtros avanzados, proceso de pedidos con carrito de compras y múltiples métodos de pago, gestión de categorías y productos por parte del restaurante con control de disponibilidad, panel administrativo centralizado para el propietario de la plataforma con métricas globales, y un sistema de posicionamiento web para la captación de nuevos clientes mediante una landing page de ventas optimizada.

La documentación técnica incluida está diseñada para facilitar la implementación mediante agentes de inteligencia artificial, estableciendo roles claros, flujos de trabajo definidos y especificaciones detalladas que permiten la generación automatizada de código. El documento proporciona suficiente contexto para que cualquier desarrollador o agente AI pueda comprender las decisiones arquitectónicas y proceder con la implementación sin necesidad de consultas adicionales frecuentes. El alcance no incluye el desarrollo de aplicaciones móviles nativas, aunque la versión web progresiva proporcionará una experiencia comparable en dispositivos móviles.

---

## 2. Análisis del Dominio

### 2.1 Entidades Principales

El dominio del problema se estructura en torno a cinco entidades fundamentales que interactúan para formar el ecosistema completo de la plataforma. La primera entidad corresponde a la Plataforma, que representa la instalación central del software y contiene la configuración global, planes de suscripción, y parámetros aplicables a todos los tenants. Esta entidad también almacena métricas agregadas, configuraciones de pasarelas de pago soportadas, y parámetros de sistema como límites de uso y políticas de retención de datos.

La segunda entidad es el Restaurante, que actúa como tenant independiente con sus datos comerciales, configuración de personalización, categorías, productos, horarios de operación, y métodos de pago aceptados. Cada restaurante mantiene aislamiento completo de datos respecto a otros restaurantes, implementando seguridad a nivel de base de datos y aplicación. El restaurante también contiene referencias a sus usuarios autorizados, mesas con códigos QR generados, y métricas de rendimiento propias.

La tercera entidad abarca al Usuario final, que puede ser un cliente del restaurante que escanea el código QR o un visitante web que explora la carta sin necesariamente realizar un pedido. Esta entidad soporta tanto usuarios anónimos como usuarios registrados, diferenciando sus capacidades según el nivel de autenticación. Los usuarios registrados pueden acceder a historial de pedidos, preferencias guardadas, y seguimiento de pedidos anteriores.

La cuarta entidad comprende el Pedido, que representa una transacción comercial con su estado de lifecycle completo desde la creación hasta la entrega o cancelación, incluyendo detalles de productos, personalización, datos de entrega o consumo en local, y método de pago seleccionado. El pedido mantiene trazabilidad completa de cambios de estado con timestamps y referencias al usuario que realizó cada actualización. La quinta entidad es la Categoría, que organiza los productos dentro de la carta del restaurante y permite tanto la estructuración lógica del menú como la aplicación de filtros y navegación para el usuario final. Cada una de estas entidades mantiene relaciones complejas entre sí, formando un grafo de dependencias que debe ser gestionado tanto en la capa de datos como en la lógica de negocio.

### 2.2 Roles de Usuario

El sistema define una jerarquía de roles claramente diferenciados que determinan los permisos y capacidades disponibles para cada tipo de usuario. El rol de Super Administrador posee acceso completo a todas las funcionalidades de la plataforma, incluyendo la gestión de restaurantes registrados, configuración de planes y precios, acceso a métricas globales, y capacidades de soporte técnico como acceso de emergencia a restaurantes y modificación de suscripciones. Este rol está limitado a un pequeño número de usuarios internos de la organización dueña de la plataforma.

El rol de Administrador de Restaurante corresponde al propietario o gerente del establecimiento, con acceso completo a la gestión de su propio restaurante incluyendo productos, pedidos, configuraciones y reportes. Este usuario puede invitar a otros usuarios al mismo restaurante asignándoles roles específicos con permisos granulares. El rol de Personal de Cocina representa al personal operativo que recibe y procesa los pedidos entrantes, con acceso de lectura a los detalles de pedidos pero sin capacidad de modificación de configuraciones del restaurante ni acceso a información financiera sensible.

El rol de Cliente Anónimo representa a los usuarios que acceden al menú sin autenticación, pudiendo explorar la carta y realizar pedidos sin necesidad de crear una cuenta. Esta modalidad está optimizada para la experiencia de escaneo de QR donde el cliente quiere pedir rápidamente sin barreras de registro. El rol de Cliente Registrado corresponde a usuarios que han creado una cuenta en la plataforma, permitiendo funcionalidades adicionales como historial de pedidos, preferencias guardadas, direcciones de entrega frecuentes, y seguimiento de pedidos anteriores. El rol de Mesero representa al personal del restaurante que puede tomar pedidos en nombre de los clientes y tiene acceso a funcionalidades específicas del punto de venta, incluyendo modificación de pedidos y gestión de mesas. Esta estructura de roles permite flexibilidad operativa mientras mantiene la seguridad y aislamiento de datos entre diferentes usuarios y restaurantes.

### 2.3 Flujos de Negocio Principales

El flujo de negocio primario inicia cuando un cliente escanea el código QR ubicado en la mesa del restaurante, siendo redirigido automáticamente a la carta digital específica de ese establecimiento. El sistema resuelve el código QR para identificar el restaurante y la mesa, mostrando la carta personalizada con la identidad visual del establecimiento. El cliente explora las categorías disponibles, selecciona productos, personaliza según las opciones configuradas como tamaño, complementos y preferencias, y añade items al carrito de compras con control de cantidades.

Al finalizar la selección, el cliente procede al checkout donde confirma los datos del pedido, selecciona el método de pago entre las opciones activadas por el restaurante, y envía la orden. El restaurante recibe el pedido en tiempo real en su panel de administración mediante notificaciones sonoras y visuales, donde el personal de cocina lo procesa y actualiza su estado a través del lifecycle definido desde PENDING hasta COMPLETED. El cliente puede seguir el estado de su pedido en tiempo real desde su dispositivo.

El flujo de onboarding de restaurantes comienza cuando un potencial cliente visita la landing page de ventas, explora las características del producto mediante secciones de beneficios, precios y testimonios, y decide contratar un plan. El usuario completa un formulario de registro con datos básicos y selección de plan, realizando el pago inicial si aplica. El super administrador recibe la solicitud de registro, verifica los datos si aplica validación manual, y aproba el registro activando la cuenta. El restaurante obtiene acceso a su panel de configuración donde completa los datos del establecimiento, configura su carta con categorías y productos, personaliza la apariencia visual, genera su código QR para mesas, y activa el servicio para comenzar a recibir pedidos. Este flujo de extremo a extremo representa la experiencia completa desde la captación comercial hasta la operación diaria del restaurante.

---

## 3. Requisitos Funcionales

### 3.1 Módulo de Landing Page de Ventas

La landing page constituye el punto de entrada principal para la captación de nuevos clientes y debe comunicar de manera efectiva la propuesta de valor del producto. El módulo debe incluir una sección hero con headline persuasivo, subtítulo descriptivo, y llamado a la acción claro que dirija al formulario de registro o demostración. El diseño visual debe transmitir profesionalismo y modernidad, utilizando elementos de la identidad de marca del producto. La sección hero debe incluir elementos de prueba social como logos de restaurantes activos o métricas de éxito.

Una sección de características destacadas debe presentar las principales funcionalidades del producto mediante iconografía profesional, texto explicativo conciso y elementos visuales atractivos, diferenciando claramente las ventajas competitivas de la plataforma. Cada característica debe incluir un título, descripción breve e ilustración o screenshot si aplica. Las características deben organizarse en categorías lógicas como gestión de menú, pedidos, pagos y análisis. La sección de precios debe mostrar los planes disponibles con sus beneficios, limitaciones de uso como número de productos y pedidos mensuales, y precios de forma transparente, permitiendo al usuario comparar opciones y seleccionar el plan más adecuado. Los planes deben diferenciarse claramente con un plan recomendado destacado.

El módulo debe incorporar una sección de testimonios y casos de éxito que genere confianza mediante reseñas de restaurantes existentes, métricas de resultados como increase en pedidos o reducción de tiempos de atención, y fotografías de establecimientos reales con permiso de uso. Una sección de FAQ debe abordar las dudas más frecuentes de los potenciales clientes sobre funcionamiento, integración, soporte técnico, y aspectos de pago, con contenido optimizado para posicionamiento en buscadores. El footer debe incluir enlaces a páginas legales como términos y condiciones y política de privacidad, información de contacto, enlaces a redes sociales, y navegación secundaria. La landing page debe ser completamente responsiva, optimizada para SEO con meta tags apropiados, OpenGraph para redes sociales, y debe cumplir con estándares de accesibilidad web nivel AA. Además, debe incluir un formulario de contacto para usuarios que prefieran asistencia personalizada antes de contratar, con validación de campos y respuesta automática de confirmación.

### 3.2 Módulo de Carta Digital Pública

El módulo de carta digital representa la interfaz que los clientes del restaurante visualizan al escanear el código QR y constituye el componente central de la experiencia de usuario. El diseño debe priorizar la legibilidad y usabilidad en dispositivos móviles, considerando que la mayoría de accesos provendrán de smartphones con pantallas pequeñas. La carta debe mostrar las categorías disponibles con contador de productos en cada una, permitiendo navegación fluida entre secciones mediante scroll suave o menú de anclas fijas. Cada categoría puede mostrar una imagen representativa si está configurada.

Cada producto debe presentar imagen atractiva cuando esté disponible con carga progresiva, nombre descriptivo, descripción detallada de ingredientes y alérgenos con highlight de alérgenos comunes, precio con indicación de moneda, y etiquetas opcionales como vegetariano, vegano, sin gluten, picante o nuevo. La información nutricional como calorías debe ser visible si está configurada. El detalle del producto debe mostrar todas las opciones de personalización disponibles incluyendo variantes de tamaño, complementos obligatorios y opcionales, y notas especiales del cliente.

La funcionalidad de búsqueda debe permitir a los usuarios encontrar productos específicos por nombre o ingredientes de forma instantánea con sugerencias en tiempo real. El filtro por categorías y etiquetas dietéticas debe permitir refinamiento de la vista según preferencias alimentarias con persistencia durante la sesión. El selector de cantidad debe facilitar la adición de múltiples unidades del mismo producto con controles intuitivos. El carrito de compras debe mostrar un resumen en tiempo real de los items seleccionados con imagen, nombre, cantidad, precio unitario y subtotal, permitir edición de cantidades con validación de stock, eliminación de items individuales, y aplicación de cupones de descuento cuando estén configurados con validación de validez y restricciones. El checkout debe guiar al usuario a través de la confirmación de datos de contacto si es necesario, selección de método de pago, notas especiales para cocina, y confirmación final del pedido con generación de número de seguimiento y estimación de tiempo de preparación.

### 3.3 Módulo de Gestión de Restaurante

El panel de gestión del restaurante permite al administrador del establecimiento configurar y mantener todos los aspectos operativos de su carta digital. La gestión de categorías debe permitir crear, editar, eliminar y reordernar categorías mediante drag and drop, con control de visibilidad para ocultar categorías estacionales sin eliminar, y asignación de imágenes representativas para cada categoría. La reorganización debe reflejarse instantáneamente en la carta pública.

La gestión de productos debe incluir formulario completo con nombre, descripción, precio, imagen con carga y recorte, categoría asociada con búsqueda, disponibilidad con control de inventario, y opciones de personalización como tamaños, complementos, o eliminaciones de ingredientes. El sistema debe soportar productos con variantes de precio según selección, productos con opciones adicionales con costo extra, y productos temporarios que aparecen solo en rangos de fecha específicos para ofertas especiales. La duplicación de productos facilita la creación de variaciones similares.

La configuración del restaurante debe incluir datos de contacto como nombre comercial, dirección completa, teléfono, email, horarios de atención con días y franjas horarias configurables incluyendo excepciones por feriados, y enlaces a redes sociales. La personalización visual debe permitir seleccionar colores institucionales mediante selector con preview en vivo, cargar logo e imagen de portada, y ajustar opciones de presentación de la carta como número de productos por fila. La gestión de métodos de pago debe permitir activar o desactivar opciones como efectivo, tarjetas de crédito y débito mediante pasarelas específicas como Webpay, transferencias con datos de cuenta, o pagos digitales. El módulo de pedidos debe mostrar el listado con filtros por estado, fecha, tipo de pedido y número de orden, detalle completo de cada pedido con items y personalización, actualización de estados con transiciones permitidas y registro de auditoría, y capacidades de impresión o exportación en formatos PDF y Excel.

### 3.4 Módulo de Super Administrador

El panel de super administrador proporciona control centralizado sobre toda la plataforma y sus restaurantes clientes. La gestión de restaurantes debe permitir listar todos los establecimientos registrados con filtros por estado como activo, suspendido o pendiente, plan, fecha de registro, y actividad reciente. El super administrador debe poder crear nuevos restaurantes manualmente para casos especiales, aprobar o rechazar solicitudes de registro verificando datos y documentación, suspender temporalmente establecimientos por incumplimiento de términos con notificación al restaurante, y eliminar restaurantes inactivos con archivado de datos por período legal.

La gestión de planes y precios debe permitir definir diferentes niveles de servicio con características diferenciadas, precios mensuales o anuales, y límites de uso como número de productos, pedidos mensuales, o funcionalidades disponibles como dominio personalizado o analytics avanzados. Los cambios en planes deben propagarse correctamente a restaurantes existentes. El dashboard de analytics debe mostrar métricas globales de la plataforma incluyendo total de restaurantes activos con desglose por plan, pedidos procesados en diferentes períodos con tendencias, ingresos generados por suscripciones con proyección, y tasas de retención y churn.

La gestión de usuarios administradores debe permitir crear cuentas de super administrador con diferentes niveles de permisos como solo lectura o acceso completo, asignar roles específicos, y mantener registro de actividades de administradores para auditoría. La configuración global debe incluir parámetros aplicables a todos los restaurantes como pasarelas de pago soportadas y sus claves de configuración, límites del sistema como máximo de productos o pedidos, y políticas de privacidad base que pueden ser extendidas por restaurantes. El módulo de soporte debe facilitar la atención a restaurantes con acceso a sus configuraciones para diagnóstico, capacidad de intervenir en pedidos problemáticos como cancelaciones o reembolsos, y sistema de tickets para consultas técnicas con categorización y priorización.

### 3.5 Módulo de Autenticación y Autorización

El sistema de autenticación debe soportar múltiples métodos de inicio de sesión adaptados a cada tipo de usuario. Para administradores de restaurante, debe incluir autenticación por email y contraseña con requisitos de complejidad mínima de ocho caracteres con mayúsculas, minúsculas y números, recuperación de contraseña mediante email con token de tiempo limitado, y autenticación de dos factores opcional para mayor seguridad. Para clientes finales, debe permitir acceso como invitados sin registro obligatorio pero con limitaciones de funcionalidades, y ofrecer la opción de crear cuenta para funcionalidades adicionales como historial y preferencias.

La integración con proveedores externos como Google y Apple debe estar disponible para simplificar el proceso de registro mediante OAuth 2.0, con manejo de linked accounts y migración de datos. El sistema de sesiones debe gestionar tokens JWT con tiempos de expiración configurables de quince minutos para access token y siete días para refresh token, renovación automática de tokens antes de expiración, y cierre de sesión remoto que invalida refresh tokens.

La autorización debe implementarse mediante un sistema de permisos basado en roles que controle el acceso a cada endpoint y funcionalidad de la aplicación. Los middlewares de autenticación deben verificar la validez de tokens en cada request protegido, extraer claims del usuario y restaurant asociado, y rechazar requests con tokens expirados o inválidos. Los guards de autorización deben validar que el usuario autenticado tenga los permisos necesarios para la operación solicitada verificando rol y propiedad de recursos. El aislamiento de datos entre restaurantes debe ser absoluto, implementando a nivel de servicio y base de datos para asegurar que un administrador de restaurante solo pueda acceder a información de su propio establecimiento mediante filtros automáticos en todas las queries. Los logs de auditoría deben registrar todas las acciones sensibles incluyendo cambios de configuración, modificaciones de datos críticos, accesos a información sensible, y acciones de soporte con referencia de ticket.

---

## 4. Requisitos No Funcionales

### 4.1 Rendimiento

El sistema debe garantizar tiempos de respuesta óptimos para mantener una experiencia de usuario fluida y profesional. El tiempo de carga inicial de la carta digital debe ser inferior a dos segundos en conexiones 4G estándar, medido mediante métricas de Core Web Vitals con especial atención a Largest Contentful Paint que debe ser inferior a dos punto cinco segundos y First Input Delay que debe ser inferior a cien milisegundos. Las operaciones de consulta como navegación entre categorías, búsqueda de productos, y visualización de detalle deben completarse en menos de quinientos milisegundos para mantener sensación de instantaneidad.

Las operaciones de escritura como creación de productos, actualización de precios, y confirmación de pedidos deben completarse en menos de dos segundos incluyendo validación, persistencia y notificaciones. El sistema debe soportar una concurrencia de al menos quinientos pedidos simultáneos por restaurante promedio, con capacidad de escalar horizontalmente mediante Kubernetes para eventos de alta demanda como días festivos o promociones especiales. La base de datos debe estar optimizada para manejar consultas complejas sobre catálogos con miles de productos y búsquedas facetadas eficientes mediante índices apropiados y query optimization.

El sistema de caché debe almacenar resultados de consultas frecuentes con políticas de invalidación apropiadas para mantener datos actualizados sin sacrificar rendimiento, utilizando Redis con TTL configurable según tipo de dato. Las imágenes deben servirse mediante CDN con optimización automática de formato y tamaño según el dispositivo del cliente, soporte para formatos modernos como WebP y AVIF, y lazy loading para imágenes below the fold. El bundle de JavaScript debe estar optimizado con code splitting automático de Next.js y tree shaking para eliminar código muerto.

### 4.2 Escalabilidad

La arquitectura debe estar diseñada para escalar horizontalmente mediante la adición de instancias de servicios sin requerir cambios estructurales significativos. El diseño multi-tenant debe permitir agregar nuevos restaurantes sin degradación de rendimiento para tenants existentes, implementando connection pooling apropiado y limits de recursos por tenant si es necesario. La base de datos debe soportar estrategias de particionamiento para manejar crecimiento de datos, con capacidad de escalar reads mediante réplicas de lectura y writes mediante sharding si el volumen lo justifica en fases avanzadas.

El sistema de colas debe permitir procesamiento asíncrono de tareas como envío de notificaciones, generación de reportes, y procesamiento de pagos sin bloquear operaciones principales, utilizando RabbitMQ o Redis streams para messaging. La infraestructura de contenedores debe facilitar el despliegue de múltiples réplicas de cada servicio con balanceo de carga automático mediante Kubernetes services. El autoscaling debe configurarse basado en métricas de uso de CPU, memoria, y latencia de respuesta para responder automáticamente a cambios en la demanda, con mínimos y máximos configurables por servicio.

La arquitectura de APIs debe ser versionada para permitir evoluciones sin romper clientes existentes, utilizando versionado en URL como api/v1/ con compatibilidad hacia atrás por períodos de migración. El sistema debe documentar límites de capacidad de cada componente para facilitar planificación de capacidad y detección proactiva de cuellos de botella, con dashboards de monitorización en tiempo real. La arquitectura debe considerar escenarios de cloud bursting para manejar picos de demanda mediante escalado en cloud providers.

### 4.3 Seguridad

La seguridad debe ser una consideración integral en todos los aspectos del diseño e implementación del sistema. Todas las comunicaciones deben realizarse exclusivamente sobre HTTPS con certificados válidos y configuración de HSTS para forzar HTTPS. Las contraseñas deben almacenarse utilizando algoritmos de hash robustos como bcrypt con factor de costo doce, nunca en texto plano ni utilizando algoritmos obsoletos como MD5 o SHA1. Los tokens de autenticación deben ser JWT firmadas con algoritmos seguros como RS256, con tiempos de expiración cortos de quince minutos para access tokens y soporte para revocación mediante token blacklisting.

La protección contra ataques comunes debe incluir headers de seguridad CSP configurados apropiadamente, sanitización de inputs contra XSS en todos los puntos de entrada, protección CSRF en formularios y APIs stateful, y rate limiting en endpoints públicos para prevenir abuse. La validación de datos debe ser exhaustiva en todas las capas, con Zod schemas compartidos entre frontend y backend. Los datos sensibles como información de tarjetas de pago deben manejarse exclusivamente a través de pasarelas de pago certificadas PCI-DSS como Stripe o Webpay, nunca almacenando datos de tarjetas en los sistemas propios excepto tokens de referencia.

La segregación de entornos debe mantener separados desarrollo, staging, y producción con diferentes credenciales y configuraciones, sin posibilidad de acceder a datos de producción desde entornos de desarrollo. Los logs no deben incluir información sensible como contraseñas, tokens, o datos personales en texto claro, con masking automático de campos sensibles. Las auditorías de seguridad periódicas deben realizarse mediante herramientas automatizadas como OWASP ZAP y evaluaciones manuales de penetration testing al menos anualmente, con remediation de vulnerabilidades críticas en menos de veinticuatro horas.

### 4.4 Disponibilidad

El sistema debe garantizar alta disponibilidad para mantener la operación continua de los restaurantes y la confianza de los usuarios. El objetivo de tiempo de disponibilidad debe ser del 99.9% mensual, permitiendo un máximo de cuarenta y tres minutos de inactividad planificada y no planificada combinada. La recuperación ante desastres debe incluir backups incrementales cada hora, backups completos diarios, retención de treinta días, y capacidad de restauración en menos de una hora con procedimientos documentados y probados.

Los componentes críticos como API de pedidos y carta digital deben desplegarse con redundancia de al menos dos instancias en diferentes zonas de disponibilidad para tolerate fallos de zona. Los mecanismos de health check deben monitorear continuamente la salud de cada componente, detectando fallos mediante liveness probes y redirigiendo tráfico mediante readiness probes. El plan de respuesta a incidentes debe definir procedimientos para diferentes escenarios de fallo, roles de respuesta con responsables claros, y tiempos objetivo de resolución según severidad.

Las actualizaciones y mantenimiento deben poder realizarse sin interrupciones de servicio mediante estrategias de despliegue blue-green o rolling updates con zero downtime deployment. La monitorización proactiva debe alertar sobre degradaciones de rendimiento antes de que afecten a los usuarios finales, con umbrales configurables y escalación automática. Los runbooks de operaciones deben documentar procedimientos para escenarios comunes de fallo con steps de diagnóstico y remediation.

### 4.5 Mantenibilidad

El código fuente debe adherirse a estándares de calidad que faciliten el mantenimiento y evolución del sistema a largo plazo. La deuda técnica debe mantenerse controlada mediante revisiones de código obligatorias con mínimo una aprobación, análisis estático automatizado en CI con reglas estrictas, y refactorización programada asignando tiempo en cada sprint. La cobertura de tests unitarios debe ser superior al ochenta por ciento para lógica de negocio crítica, con tests de integración cubriendo flujos principales end-to-end.

La documentación de código debe ser exhaustiva, incluyendo comentarios para lógica compleja que no es autoexplicativa, documentación de APIs con ejemplos, y guías de arquitectura para nuevos desarrolladores. La estructura del proyecto debe seguir convenciones establecidas que faciliten la navegación y comprensión del código por nuevos desarrolladores, con archivos organizados por funcionalidad no por tipo. Las dependencias deben mantenerse actualizadas con un proceso de actualización regular que equilibre estabilidad con acceso a mejoras de seguridad y rendimiento, con testing exhaustivo antes de updates mayores.

El logging estructurado debe facilitar el diagnóstico de problemas en producción, con niveles apropiados DEBUG para desarrollo, INFO para operaciones normales, WARN para condiciones anómalas, y ERROR para fallos, con correlación de requests mediante IDs únicos. Las migraciones de base de datos deben ser reversibles y probadas antes de despliegue a producción, con scripts de rollback disponibles. La documentación técnica debe mantenerse actualizada como parte del proceso de desarrollo, con revisión de docs en cada release.

---

## 5. Arquitectura Técnica

### 5.1 Visión General de Arquitectura

La arquitectura del sistema sigue un patrón de microservicios containerizados diseñado para escalabilidad, mantenibilidad y resiliencia operativa. El frontend de la aplicación se construye con Next.js en su configuración App Router, aprovechando las capacidades de Server Components para optimización de rendimiento y SEO en páginas públicas, mientras Client Components manejan interactividad en dashboards y procesos de checkout. El backend se estructura como un conjunto de servicios especializados que pueden desplegarse independientemente, incluyendo servicios para autenticación que gestiona usuarios y sesiones, gestión de restaurantes que maneja menús y configuraciones, procesamiento de pedidos con lifecycle completo, y notificaciones que abstrae canales de comunicación.

La comunicación entre servicios sigue un modelo híbrido donde las APIs REST se utilizan para interacciones síncronas que requieren respuesta inmediata como creación de pedidos, y un sistema de mensajería asíncrono mediante colas procesa eventos que no requieren respuesta inmediata como envío de emails de confirmación o actualización de analytics. El API Gateway centralizado gestiona la entrada de tráfico, autenticación de requests verificando tokens JWT, rate limiting por IP y usuario, y direccionamiento a servicios backend según el path de la request.

La persistencia de datos se gestiona mediante PostgreSQL como base de datos relacional principal, aprovechando sus capacidades de transacciones ACID, consultas complejas, y extensiones especializadas. Redis se utiliza para caché de alta velocidad, gestión de sesiones con invalidación, y como broker de mensajería para colas de trabajos. El almacenamiento de archivos como imágenes de productos y logos utiliza almacenamiento de objetos compatible con S3, con CDN para distribución global. La arquitectura de despliegue utiliza Docker para containerización proporcionando portabilidad entre entornos, y Kubernetes como orquestador proporcionando capacidades avanzadas de deployment, scaling y self-healing.

### 5.2 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USUARIOS FINALES                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────────┐  │
│  │  Clientes    │  │ Restaurantes │  │  Super Admins│  │    Meseros     │  │
│  │  (QR/Móvil)  │  │ (Gestión)    │  │  (Plataforma)│  │  (Punto Venta) │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └───────┬────────┘  │
└─────────┼─────────────────┼─────────────────┼───────────────────┼──────────┘
          │                 │                 │                   │
          └────────────┬────┴─────────────────┴───────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          API GATEWAY / LOAD BALANCER                         │
│                    (Nginx / Traefik con TLS termination)                    │
└─────────────────────────────────────────────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   Frontend   │ │   Frontend   │ │   Frontend   │
│   Landing    │ │   Pública    │ │   Dashboard  │
│   (Next.js)  │ │   (Next.js)  │ │   (Next.js)  │
└──────────────┘ └──────────────┘ └──────────────┘
        │              │              │
        └──────────────┼──────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           BACKEND MICROSERVICIOS                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐   │
│  │  Auth Svc   │ │ Restaurant  │ │   Order     │ │    Notification     │   │
│  │             │ │    Svc      │ │    Svc      │ │        Svc          │   │
│  │ - Login     │ │ - CRUD      │ │ - Create    │ │ - Email             │   │
│  │ - Register  │ │ - Settings  │ │ - Update    │ │ - SMS               │   │
│  │ - Sessions  │ │ - Menu      │ │ - Lifecycle │ │ - Push              │   │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────────────┘   │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐   │
│  │  Payment    │ │   Image     │ │  Analytics  │ │      Queue          │   │
│  │    Svc      │ │   Svc       │ │    Svc      │ │      System         │   │
│  │ - Gateway   │ │ - Storage   │ │ - Reports   │ │  (RabbitMQ/Redis)   │   │
│  │ - Webhooks  │ │ - CDN       │ │ - Metrics   │ │                     │   │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  PostgreSQL  │ │    Redis     │ │  Object      │
│   (Primary)  │ │   (Cache)    │ │  Storage     │
│              │ │              │ │  (S3/Minio)  │
└──────────────┘ └──────────────┘ └──────────────┘
```

### 5.3 Descripción de Componentes

El componente de Frontend Landing constituye el escaparate público de la plataforma, implementado como una aplicación Next.js independiente con renderizado estático para páginas informativas como características, precios y FAQ, y renderizado del lado del servidor para contenido dinámico. Este componente se optimiza para SEO mediante metadata dinámica generada en server components, generación automática de sitemaps para indexación, y estructura semántica HTML con landmarks apropiados. La comunicación con el backend se realiza exclusivamente mediante APIs documentadas, y los assets estáticos se sirven a través de CDN para minimizar latencia global.

El componente de Frontend Pública representa la carta digital que los clientes visualizan al escanear códigos QR, diseñada específicamente para experiencia móvil con interfaces táctiles optimizadas, tamaños de touch target de al menos cuarenta y cuatro píxeles, y tipografía legible sin zoom. La aplicación implementa lazy loading para imágenes de productos utilizando Intersection Observer, prefetching de categorías durante idle time para navegación instantánea, y modo offline parcial mediante Service Workers que cachean carta y permiten visualización de menú sin conexión aunque no nuevos pedidos. El estado del carrito se sincroniza con localStorage para persistencia entre sesiones del navegador, con sincronización con backend para recuperación de carritos abandonados. La generación de URLs sigue el patrón de subdominios como restaurant.dominioportal.com o rutas asignadas como portal.com/r/restaurant-slug para facilitar el acceso directo mediante códigos QR.

El componente de Frontend Dashboard proporciona las interfaces de administración tanto para super administrador como para administradores de restaurante, implementando un sistema de layouts compartidos con navegación adaptativa según el rol del usuario, mostrando solo secciones autorizadas. La aplicación incluye validaciones de formulario robustas con feedback en tiempo real, feedback visual de operaciones asíncronas con loading states y toast notifications, y capacidades de exportación de datos en formatos estándar como PDF para facturas y Excel para reportes. El sistema de permisos se implementa tanto en frontend mediante ocultamiento de elementos y rutas como en backend mediante verificación de claims en cada request, asegurando defensa en profundidad.

El componente de API Gateway actúa como punto único de entrada para todo el tráfico de la aplicación, manejando terminación SSL con certificados de proveedores como Let's Encrypt, balanceo de carga entre instancias de servicios con algoritmos configurables, y políticas de rate limiting por IP y usuario con ventanas deslizantes. El gateway implementa validación de tokens JWT emitidos por el servicio de autenticación verificando firma, expiración y claims, transformación de requests para compatibilidad entre versiones de API, y logging centralizado de tráfico para auditoría y análisis con correlación de request IDs.

El componente de Microservicio de Autenticación gestiona el ciclo de vida completo de usuarios y sesiones, incluyendo registro con validación de email único y complejidad de contraseña, login con múltiples proveedores incluyendo OAuth Google y Apple, recuperación de contraseña con tokens de tiempo limitado, y gestión de perfiles con actualización de datos. El servicio implementa múltiples proveedores de autenticación con abstracción que permite agregar nuevos proveedores fácilmente. La gestión de sesiones utiliza tokens JWT con refresh tokens almacenados en Redis para permitir revocación instantánea por usuario o administrador. El servicio también maneja la asignación de roles y permisos a usuarios, emitiendo claims personalizados en los tokens de autenticación que incluyen roles, restaurantId si aplica, y permisos específicos.

El componente de Microservicio de Restaurantes encapsula toda la lógica de negocio relacionada con la gestión de establecimientos, incluyendo CRUD de restaurantes con validaciones de negocio, configuración de planes y suscripciones verificando límites del plan activo, gestión de menús con categorías y productos con control de stock, y personalización visual con validación de assets. El servicio implementa soft delete para mantener trazabilidad histórica de cambios y permite versioning de menús para rollback ante errores con historial completo. La lógica de aislamiento multi-tenant se implementa en este nivel verificando que cada request acceda únicamente a datos del tenant autorizado mediante filtros automáticos en todas las queries.

El componente de Microservicio de Pedidos gestiona el ciclo de vida completo de pedidos desde su creación hasta su finalización, incluyendo validación de disponibilidad de productos consultando inventario en tiempo real, cálculo de totales con impuestos configurables por restaurante y descuentos aplicados, integración con pasarelas de pago manejando webhooks y estados de transacción, y actualización de estados con transición de PENDING a CONFIRMED a PREPARING a READY a SERVED/DELIVERED a COMPLETED. El servicio implementa una máquina de estados bien definida con transiciones permitidas validadas antes de cada cambio y registro de auditoría de cada cambio con usuario, timestamp y metadata. La integración con el sistema de colas permite notificación asíncrona a clientes y personal de cocina sobre cambios de estado mediante emails, SMS o push notifications según preferencias.

---

## 6. Stack Tecnológico

### 6.1 Frontend

El desarrollo frontend se fundamenta en Next.js 14+ utilizando App Router como paradigma de organización de rutas y componentes. Next.js proporciona renderizado híbrido con Server Components para operaciones que no requieren interactividad del cliente como carga de carta, metadata SEO y datos de restaurante, y Client Components para interacciones dinámicas como carrito de compras, filtros y checkout. La generación de páginas estáticas incrementales permite cachear contenido que cambia infrecuentemente mientras mantiene la capacidad de actualización bajo demanda. El sistema de Image Optimization facilita el serving de imágenes responsivas en formatos modernos como WebP y AVIF automáticamente con soporte para blur placeholders.

React Query (TanStack Query) se implementa como biblioteca de gestión de estado asíncrono para caching, sincronización, y actualización de datos del servidor. La biblioteca proporciona hooks tipados que simplifican el manejo de estados de carga, error, y éxito en componentes de interfaz, con soporte para refetch automático en background y stale-while-revalidate. La configuración de prefetching en hover y Mutation Observer optimiza la percepción de velocidad por parte del usuario, cargando datos antes de que sean necesarios. La integración con mutations permite gestión elegante de operaciones de escritura con invalidación automática de caches relacionados, manteniendo UI sincronizada con servidor.

Tailwind CSS se utiliza como framework de estilos utilitarios, proporcionando flexibilidad para crear diseños personalizados sin la necesidad de escribir CSS personalizado extenso. La configuración incluye un sistema de diseño base con tokens de diseño para colores, tipografía y espaciado que mantienen consistencia visual mediante extend theme. Los plugins oficiales extienden las capacidades con formularios con estilos consistentes, tipografía con readability optimized, y aspectos de accesibilidad. La purga automática de CSS no utilizado en producción mediante content scanning minimiza el tamaño de los bundles generados a valores típicamente menores a cien kilobytes.

Zod se implementa para validación de esquemas tanto en frontend como en backend, proporcionando inferencia de tipos TypeScript a partir de esquemas de validación para eliminar duplicación. La biblioteca soporta validación de strings, números, objetos complejos y estructuras anidadas con mensajes de error personalizados y localization. La integración con formularios permite validación en tiempo real con feedback inmediato al usuario sin necesidad de submits. Los esquemas definidos se comparten entre frontend y backend mediante packages compartidos para garantizar consistencia en las validaciones, eliminando la posibilidad de bypass en cliente.

### 6.2 Backend

El backend se implementa utilizando Node.js con TypeScript, aprovechando las capacidades de tipado estático para mantenibilidad del código y reducción de errores en tiempo de desarrollo. El framework NestJS proporciona estructura opinionada con módulos, inyección de dependencias, y convenciones que facilitan el desarrollo escalable y mantenible. La arquitectura hexagonal permite separar claramente la lógica de dominio de los adaptadores de entrada y salida, facilitando testing y evolución. Los guards e interceptors proporcionan mecanismos reutilizables para cross-cutting concerns como autenticación, logging, rate limiting y validación.

Prisma se utiliza como ORM de base de datos, proporcionando type safety en consultas y migrations versionadas. El cliente generado ofrece autocompletado y verificación de tipos en tiempo de compilación para todas las operaciones de base de datos, eliminando errores de typos en nombres de campos. Las migrations de Prisma son scripts SQL versionados que permiten evolución controlada del esquema con capacidad de rollback y down migrations. El feature de Data Proxy facilita conexiones a bases de datos serverless sin gestionar pools de conexiones manualmente, optimizando recursos en entornos serverless.

PostgreSQL sirve como base de datos relacional principal, aprovechando sus capacidades de consultas complejas con CTEs y window functions, transacciones ACID para consistencia de pedidos, y extensiones como PostGIS si se requiere geolocalización futura. La elección de PostgreSQL sobre otras alternativas como MySQL se fundamenta en su madurez, rendimiento en workloads mixtos con muchas relaciones complejas, y ecosistema de herramientas de administración como pgAdmin y DBeaver. Las tablas principales incluyen restaurants para establecimientos, users para usuarios del sistema, categories para organización de menús, products para items del menú, orders para transacciones, y tablas de soporte para configuraciones, logs y relaciones many-to-many.

Redis se utiliza para múltiples propósitos incluyendo caché de consultas frecuentes como cartas de restaurante con TTL configurable, gestión de sesiones con revocación y expiry automático, colas de trabajos asíncronos para notificaciones y procesamiento, y rate limiting distribuido con sliding window algorithm. La arquitectura de datos en Redis sigue patrones específicos según el caso de uso: strings para valores simples como contadores, hashes para objetos estructurados como datos de sesión, y sorted sets para rankings y métricas como productos populares. La configuración de expire TTLs asegura que datos temporales no persistan indefinidamente ocupando memoria.

### 6.3 DevOps y Deployment

Docker proporciona containerización consistente para todos los componentes del sistema, eliminando diferencias entre entornos de desarrollo, staging y producción. Los Dockerfiles siguen mejores prácticas con multi-stage builds para minimizar tamaño de imágenes copiando solo artefactos necesarios, non-root users por seguridad ejecutando procesos como usuario node, y etiquetas de versión para trazabilidad de imágenes desplegadas. Los Compose files definen la composición completa de servicios para desarrollo local con todas las dependencias y orquestación básica en producción pequeña, facilitando onboarding de nuevos desarrolladores.

Kubernetes de contenedores en producción gestiona la orquestación deployment automatizado con, proporcionando capacidades de estrategias de rolling update ycaling horizontal basado en métricas de blue-green, autos CPU y lat y recuperaciónencia, automático ante fallos con restart de pods. Los manifests con réplicas y recursos, services para de Kubernetes definen deployments networking interno y externo, ingresses con TLS para routing, secrets para datos sensibles, configuración. La y configmaps para de deployment rolling update asegura zero-downtime estrategia checks configurados durante actualizaciones con health. Los health checks configuran liveness probes para hung detectar pods y readiness probes para evitar tráfico a pods no ready.

CI/CD se implementa mediante GitLab CI, automatHub Actions o Gitizando linting con ESLint y Prettier, testing con Jest y Playwright, construcción de imágenes Docker con caching de a diferentes entornos con layers, y despliegue gates de aprobación. Los pipelines incluyen stages de verificación que avanzar, con gates de calidad que prev deben pasar antes deienen merge de código con problemascoverage inferior de a umbral o errores lint. Losan la producción para validación final antes de ambientes de staging replic despliegue a producción con datos anonymizados. Los artifacts generados comoan en registries privados imágenes Docker se almacen con políticas de retención y vulnerability scanning.

---

## 7. Estructura de Base de Datos

### 7.1 Modelo de Datos Principal

```typescript
 de la base de// Esquema conceptual datos

// Planes de suscripción
model Plan {
  id          String   @id @default(uuid())
  name        String
  description String
  priceMonthly Decimal
  priceYearly  Decimal
  features    Json     // Array de características incluidas
  maxProducts Int
  maxOrders   Int?     // Límite mensual de pedidos, null = ilimitCustomDomain Boolean
ado
  has  hasAnalytics Boolean
  priority    Int      @default(0)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  restaurants Restaurant[]
}

// Restaurantesmodel Restaurant {
  (Tenants)
 @id @default id              String  (uuid())
  slug            String   @unique // URL friendly identifier
  name legalName       String            String
  String   @unique?
  email          
  phone           String?
  
 
  address         // Información de ubicación String?
  city            String?
  country         String   @default("CL Float?
  longitude       Float?
  
  // Configuración")
  latitude        visual
  logoUrl         String?
  bannerUrl       String?
  primaryColor    String   @default("#000000")
  fontFamily      String?
  
  // Configuración operativa
  timezone        String   @default("America/Santiago")
  currency        String   @default("CLP")
  isActive        Boolean  @default(true)
  
  // Información de suscripción
  planId          String
  plan            Plan     @relation(fields: [planId], references: [id])
  subscriptionStart DateTime?
  subscriptionEnd   DateTime?
  
  // Timestamps
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  // Relaciones
  users           User[]
  categories      Category[]
  products        Product[]
  orders          Order[]
  tables          Table[]
  paymentMethods  PaymentMethod[]
  openingHours    OpeningHour[]
  
  @@index([slug])
  @@index([isActive])
}

// Usuarios del sistema
 id            String   @id @defaultmodel User {
 (uuid())
  email passwordHash  String         String
 
  firstName     String?
  lastName      String?
  phone         String?
  avatarUrl     String?
  isActive      Boolean  @default(true)
  emailVerified Boolean  @default(false)
  
  // Rol y restaurant asociado
  role          UserRole @default(STAFF)
  restaurantId  String?
  restaurant    Restaurant? @relation(fields: [restaurantId], references: [id])
  
  // Timestamps
  lastLoginAt   DateTime?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  @@unique([email, restaurantId])
  @@index  @@index([([restaurantId])
role])
}

enum UserRole {
  SUPER_ADMIN
  OWNER
  MANAGER
  STAFF
  KITCHEN
}

// Categorías del menú
model Category {
  id           String   @id @default(uuid())
  name         String
  description  String?
  imageUrl     String?
  sortOrder    Int      @default(0)
  isActive     Boolean  @default(true)
  isFeatured   Boolean  @default(false)
  
  restaurantId String
  restaurant   Restaurant @relation(fields], references: [: [restaurantIdid], onDelete: Cascade)
  
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  
  products     Product[]
  
  @@index([restaurantId])
  @@index([sortOrder])
}

// Productos del menú
model Product {
  id              String   @id @default(uuid())
  name            String
  description     String?
  basePrice       Decimal
  
  // Información adicional
  imageUrl        String?
  calories        Int?
  preparationTime Int?     // En minutos
  
  // Estado
  isAvailabledefault(true)
      Boolean  @ isFeatured      Boolean  @default(false)
  isNew           Boolean  @default(false)
  
  // Datos para SEO y búsquedas
  searchKeywords  String[]
  
  // Timestamps
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  // Relaciones
 String
  restaurant  restaurantId         Restaurant @relation(fields: [restaurantId], references: [id], onDelete: Cascade)
 
  category       : [categoryId], references: [ categoryId      String Category @relation(fieldsid])
  
  variants        ProductVariant[]
  addons          ProductAddon[]
  allergens       ProductAllergen[]
  orderItems      OrderItem[]
  
  @@index([restaurantId])
  @@index([categoryId])
  @@index([isAvailable])
}

// Variantes de producto (ej: tamaño pequeño, mediano, grande)
model ProductVariant {
  id          String   @id @default(uuid())
  name        String   // Ej: "Pequeño", "Mediano", "Grande"
  priceModifier Decimal @default(0) // Precio adicional al base
  isDefault   Boolean  @default(false)
 0)
  
       @default( sortOrder   Int productId   String
  product     Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  @@index([productId])
}

// Complementos adicionales (ej: extra queso, sin cebolla)
model ProductAddon {
  id          String   @id @default(uuid())
  name        String
  price       Decimal  @default(0)
  isDefault   Boolean  @default(false) // Si viene incluido por defecto
  isRequired  Boolean  @default(false) // Si el cliente debe seleccionar
  minSelect   Int      @default(0)     // Mínimo a seleccionar si es required
  maxSelect   Int?                    // Máximo a seleccionar
  
  productId   String
  product     Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  options     ProductAddonOption[]
  
  @@index([productId])
}

model ProductAddonOption {
  id          String   @id @default(uuid())
  name        String
  price       Decimal  @default(0)
  isDefault   Boolean  @default(false)
  
  addonId     String
  addon       ProductAddon @relation(fields: [addonId], references: [id], onDelete: Cascade)
  
  @@index([addonId])
}

// Alérgenos en productos
model ProductAllergen {
  id        String   @id @default(uuid())
  allergen  Allergen
  
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  @@unique([productId, allergen])
}

enum Allergen {
  GLUTEN
  DAIRY
  NUTS
  PEANUTS
  SHELLFISH
  SOY
  EGGS
  FISH
  SESAME
  MUSTARD
  CELERY
  LUPIN
  MOLLUSCS
  SULPHITES
}

// Mesas del restaurante (para códigos QR)
model Table {
  id           String   @id @default(uuid())
  number       String   // Identificador de mesa para el cliente
  qrCodeUrl    String?
  seatingCapacity Int   @default(4)
  isActive     Boolean  @default(true)
  sortOrder    Int      @default(0)
  
  restaurantId String
  restaurant   Restaurant @relation(fields: [restaurantId], references: [id], onDelete: Cascade)
  
  orders       Order[]
  
  @@unique([restaurantId, number])
  @@index([restaurantId])
}

// Horarios de apertura
model OpeningHour {
  id           String   @id @default(uuid())
  dayOfWeek    Int      // 0 = Domingo, 1 = Lunes, etc.
  openTime     String   // HH:MM
  closeTime    String   // HH:MM
  isClosed     Boolean  @default(false)
  
  restaurantId String
  restaurant   Restaurant @relation(fields: [restaurantId], references: [id], onDelete: Cascade)
  
  @@unique([restaurantId, dayOfWeek])
  @@index([restaurantId])
}

// Métodos de pago del restaurante
model PaymentMethod {
  id           String   @id @default(uuid())
  type         PaymentType
  isActive     Boolean  @default(true)
  config       Json     // Configuración específica del método
  
  restaurantId String
  restaurant   Restaurant @relation(fields: [restaurantId], references: [id], onDelete: Cascade)
  
  @@index([restaurantId])
}

enum PaymentType {
  CASH
  CREDIT_CARD
  DEBIT_CARD
  WEBPAY
  KUESKI
  TRANSFER
}

// Pedidos
model Order {
  id              String   @id @default(uuid())
  orderNumber     String   // Número visible para el cliente
  
  // Estado del pedido
  status          OrderStatus @default(PENDING)
  statusHistory   Json     // Array de cambios de estado con timestamps
  
  // Tipo de pedido
  type            OrderType @default(DINE_IN)
  tableId         String?
  table           Table?    @relation(fields: [tableId], references: [id])
  
  // Datos del cliente (puede ser null si es anónima)
  customerId      String?
  customerName    String?
  customerPhone   String?
  customerEmail   String?
  
  // Datos de entrega/recogida
  deliveryAddress String?
  deliveryLat     Float?
  deliveryLng     Float?
  pickupTime      DateTime?
  
  // Detalles financieros
  subtotal        Decimal
  taxAmount       Decimal
  discountAmount  Decimal @default(0)
  tipAmount       Decimal @default(0)
  total           Decimal
  
  // Notas
  customerNotes   String?
  kitchenNotes    String?
  
  // Pago
  paymentMethod   PaymentType?
  paymentStatus   PaymentStatus @default(PENDING)
  paymentId       String?       // ID en pasarela de pago
  
  // Timestamps
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  confirmedAt     DateTime?
  preparingAt     DateTime?
  readyAt         DateTime?
  deliveredAt     DateTime?
  cancelledAt     DateTime?
  
  // Relaciones
  restaurantId    String
  restaurant      Restaurant @relation(fields: [restaurantId], references: [id])
  
  items           OrderItem[]
  
  @@unique([restaurantId, orderNumber])
  @@index([restaurantId])
  @@index([status])
  @@index([createdAt])
  @@index([customerId])
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PREPARING
  READY
  SERVED
  DELIVERED
  COMPLETED
  CANCELLED
}

enum OrderType {
  DINE_IN
  TAKEOUT
  DELIVERY
}

enum PaymentStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
  REFUNDED
}

// Items de pedido
model OrderItem {
  id            String   @id @default(uuid())
  quantity      Int
  unitPrice     Decimal
  totalPrice    Decimal
  
  // Personalización
  variantId     String?
  variant       ProductVariant? @relation(fields: [variantId], references: [id])
  selectedAddons Json     // Array de addons seleccionados con sus opciones
  
  // Notas especiales
  notes         String?
  
  orderId       String
  order         Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  
  productId     String
  product       Product  @relation(fields: [productId], references: [id])
  
  @@index([orderId])
  @@index([productId])
}
```

### 7.2 Consideraciones de Rendimiento

El modelo de datos está diseñado para optimizar consultas frecuentes mediante índices estratégicos y estructuras normalizadas apropiadamente. Los campos de búsqueda frecuente como restaurantId y status incluyen índices compuestos que aceleran filtrados comunes en queries de pedidos y productos. Las tablas de productos y categorías utilizan índices en campos de ordenamiento como sortOrder para paginación eficiente sin full table scan. Las foreign keys están correctamente definidas con acciones ON DELETE apropiadas para mantener integridad referencial, utilizando Cascade para deletear entidades dependientes automáticamente.

Las relaciones de productos con variantes y complementos utilizan JSON para almacenar selecciones de personalización, balanceando normalización con flexibilidad y rendimiento. Esta aproximación permite agregar nuevas opciones de personalización sin migraciones de esquema, facilitando evolución rápida del menú, aunque implica desnormalización en consultas que necesitan filtrar por opciones específicas como buscar productos con precio mayor a cierto valor considerando variantes. Para casos de uso avanzados de análisis y reportes, se consideran tablas de hechos adicionales o vistas materializadas que agregan datos de pedidos para rendimiento de dashboards.

---

## 8. APIs y Endpoints

### 8.1 API de Autenticación

La API de autenticación proporciona endpoints para gestión de identidad de usuarios en toda la plataforma. El endpoint POST /api/v1/auth/register permite crear nuevas cuentas de usuario, validando email único, complejidad de contraseña con requisitos mínimos, y datos requeridos según el tipo de usuario. El endpoint retorna el usuario creado con tokens de acceso y refresh, permitiendo login inmediato después del registro. El endpoint POST /api/v1/auth/login procesa credenciales verificando hash de contraseña, validando cuenta activa, y retornando tokens JWT con claims apropiados para el rol del usuario incluyendo restaurantId si aplica.

El endpoint POST /api/v1/auth/refresh intercambia un refresh token válido por un nuevo par de access y refresh tokens, invalidando el token anterior para prevenir reuse. El endpoint POST /api/v1/auth/forgot-password inicia el flujo de recuperación de contraseña enviando email con token de reseteo válido por una hora, almacenando hash de token para validación posterior. El endpoint POST /api/v1/auth/reset-password procesa el token de reseteo verificando validez y expiración, y establece nueva contraseña con validación de complejidad. El endpoint GET /api/v1/auth/me retorna la información del usuario autenticado actual incluyendo sus roles, permisos y datos de perfil, utilizado para hydrate estado de aplicación en cliente. El endpoint POST /api/v1/auth/logout invalida el refresh token actual para cerrar la sesión de forma segura, removiendo el token de la blacklist de Redis.

### 8.2 API de Restaurantes

La API de restaurantes proporciona endpoints CRUD para gestión de establecimientos y su configuración. El endpoint GET /api/v1/restaurants retorna el listado de restaurantes accesibles para el usuario autenticado, con filtros por estado como activo o suspendido, plan, y búsqueda por nombre, con paginación y ordenamiento. Para super administradores retorna todos los restaurantes del sistema, para administradores de restaurante retorna solo sus restaurantes. El endpoint GET /api/v1/restaurants/:id retorna los detalles completos de un restaurante incluyendo sus categorías, configuración visual y métricas básicas, verificando que el usuario tenga acceso al restaurante solicitado.

El endpoint POST /api/v1/restaurants permite crear un nuevo restaurante, asignando el plan por defecto si no se especifica, generando slug único basado en nombre, y configurando valores por defecto. El endpoint PUT /api/v1/restaurants/:id actualiza la información del restaurante como nombre, dirección y contacto, validando permisos de propietario y unicidad de slug. El endpoint PUT /api/v1/restaurants/:id/settings actualiza configuraciones específicas como colores, horarios y datos de contacto, con validación de formatos y límites. El endpoint GET /api/v1/restaurants/:id/analytics retorna métricas de uso del restaurante incluyendo pedidos del día y mes, ingresos acumulados, productos más vendidos y horarios de mayor demanda. El endpoint DELETE /api/v1/restaurants/:id realiza soft delete del restaurante cambiando estado a eliminado, archivando sus datos para cumplimiento legal.

### 8.3 API de Menú

La API de menú gestiona categorías y productos de la carta del restaurante. El endpoint GET /api/v1/restaurants/:id/categories retorna el árbol de categorías con sus productos, ordenado según configuración de sortOrder, solo incluyendo categorías activas y productos disponibles. El endpoint POST /api/v1/restaurants/:id/categories crea una nueva categoría con nombre, descripción, imagen opcional y orden, verificando límites del plan. El endpoint PUT /api/v1/categories/:id actualiza una categoría existente incluyendo reordenamiento, con validación de permisos de owner o manager. El endpoint DELETE /api/v1/categories/:id elimina una categoría verificando que no tenga productos asociados, con opción de reassignar productos a otra categoría.

El endpoint GET /api/v1/categories/:id/products retorna los productos de una categoría específica con paginación, filtros de disponibilidad y ordenamiento. El endpoint POST /api/v1/products crea un nuevo producto con toda su información incluyendo variantes, complementos, alérgenos y etiquetas, validando límites de productos del plan y datos requeridos. El endpoint PUT /api/v1/products/:id actualiza un producto existente, manteniendo integridad de pedidos históricos mediante campos inmutables para precio y nombre. El endpoint PATCH /api/v1/products/:id/availability togglea la disponibilidad de un producto sin modificar otros datos, útil para gestionar inventario del día. El endpoint DELETE /api/v1/products/:id elimina un producto verificando que no esté en pedidos activos con estado no terminal.

### 8.4 API de Pedidos

La API de pedidos gestiona el ciclo de vida completo de órdenes de compra. El endpoint GET /api/v1/orders retorna el listado de pedidos del restaurante con filtros por estado, fecha, tipo de pedido y número de orden, con paginación y ordenamiento por fecha descendente. Para super administradores retorna pedidos de todos los restaurantes con filtros adicionales. El endpoint GET /api/v1/orders/:id retorna los detalles completos de un pedido incluyendo items con personalización completa, historial de estados con timestamps, y datos de cliente, verificando acceso al restaurante del pedido.

El endpoint POST /api/v1/orders crea un nuevo pedido, validando disponibilidad de productos consultando stock en tiempo real, calculando totales con impuestos y descuentos aplicados, creando registro de pedido con estado PENDING, creando registros de order_items con selección de variantes y addons, e integrando con pasarela de pago si se especifica método electrónico. El endpoint PATCH /api/v1/orders/:id/status actualiza el estado del pedido siguiendo la máquina de estados definida con transiciones permitidas, registrando timestamp, usuario que realizó el cambio y notas opcionales. El endpoint POST /api/v1/orders/:id/cancel permite cancelar un pedido verificando que no esté en estado irreversible como PREPARING o posterior, con validación de políticas de cancelación. El endpoint GET /api/v1/orders/:id/receipt retorna un formato imprimible del comprobante de pedido en PDF. El endpoint POST /api/v1/orders/:id/refund inicia el proceso de reembolso si el pago fue procesado electrónicamente, verificando estado del pago y políticas de reembolso.

### 8.5 API Pública de Carta

La API pública de carta está optimizada para acceso desde dispositivos móviles de clientes, sin autenticación y con caché agresivo. El endpoint GET /api/public/menu/:slug retorna la carta completa de un restaurante incluyendo categorías ordenadas, productos con precios, disponibilidad y etiquetas, optimizado para velocidad con caché de cinco minutos. Este endpoint no requiere autenticación y está diseñado para ser llamado frecuentemente desde dispositivos móviles. El endpoint GET /api/public/menu/:slug/product/:id retorna el detalle expandido de un producto con todas sus opciones de personalización, variantes, complementos disponibles y alérgenos.

El endpoint GET /api/public/restaurant/:slug/info retorna la información pública del restaurante incluyendo datos de contacto, horarios de apertura formateados para visualización, métodos de pago aceptados y enlaces a redes sociales. El endpoint POST /api/public/orders permite crear pedidos sin autenticación de cliente, generando un identificador anónimo para seguimiento y vinculando a sesión mediante cookie o localStorage. El endpoint GET /api/public/orders/:orderNumber/status permite consultar el estado de un pedido mediante su número sin necesidad de autenticación, utilizado para polling de estado desde el dispositivo del cliente. Todos los endpoints públicos tienen rate limiting agresivo para prevenir abuse.

---

## 9. Estructura del Proyecto

### 9.1 Organización de Directorios

```
restaurant-portal/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── docker-build.yml
│       └── deploy.yml
├── .cursor/
│   └── rules/
│       └── project-context.md      // Contexto del proyecto para Claude Code
├── apps/
│   ├── api-gateway/                // API Gateway (opcional, puede ser Next.js)
│   ├── auth-service/               // Microservicio de autenticación
│   ├── restaurant-service/         // Microservicio de restaurantes
│   ├── order-service/              // Microservicio de pedidos
│   ├── notification-service/       // Microservicio de notificaciones
│   ├── frontend-landing/           // Landing page de ventas
│   ├── frontend-public/            // Carta digital pública
│   └── frontend-dashboard/         // Paneles de administración
├── packages/
│   ├── database/                   // Prisma schema y migrations
│   ├── shared/                     // Tipos y utilidades compartidas
│   ├── ui-components/              // Componentes UI compartidos
│   └── config/                     // Configuraciones compartidas
├── infra/
│   ├── docker/
│   │   ├── Dockerfile.api
│   │   ├── Dockerfile.frontend
│   │   └── docker-compose.yml
│   └── k8s/
│       ├── base/
│       ├── overlays/
│       └── kustomization.yml
├── docs/
│   ├── architecture/
│   ├── api/
│   ├── deployment/
│   └── development/
├── scripts/
│   ├── db-migrate.sh
│   ├── seed-data.sh
│   └── generate-api-docs.sh
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── package.json
├── pnpm-workspace.yaml
├── README.md
└── turbo.json
```

### 9.2 Estructura de Aplicación Next.js

```
apps/frontend-dashboard/
├── public/
│   ├── fonts/
│   ├── images/
│   └── icons/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── restaurants/
│   │   │   ├── orders/
│   │   │   ├── menu/
│   │   │   ├── settings/
│   │   │   └── analytics/
│   │   ├── api/
│   │   │   └── [...route]/
│   │   ├── layout.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── ui/                    // Componentes primitivos
│   │   ├── layouts/               // Componentes de layout
│   │   ├── forms/                 // Componentes de formulario
│   │   └── dashboard/             // Componentes específicos del dashboard
│   ├── lib/
│   │   ├── api.ts                 // Cliente de API
│   │   ├── auth.ts                // Utilidades de autenticación
│   │   ├── utils.ts               // Funciones utilitarias
│   │   └── hooks/                 // Custom hooks
│   ├── store/
│   │   └── index.ts               // Estado global (Zustand/Jotai)
│   ├── types/
│   │   └── index.ts               // Definiciones de tipos
│   └── styles/
│       └── globals.css
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── Dockerfile
└── package.json
```

---

## 10. Configuración de Agentes Claude Code

### 10.1 Configuración del Agente Orquestador

El agente orquestador actúa como punto de entrada para todas las solicitudes de desarrollo, analizando la naturaleza de la tarea y delegando al subagente apropiado. Este agente mantiene un modelo mental del estado del proyecto, coordinando cambios que afectan múltiples componentes como cuando una изменение en el modelo de datos requiere updates en frontend y backend, y asegurando consistencia en las implementaciones. La configuración del agente orquestador incluye el contexto completo del proyecto mediante el archivo project-context.md, las convenciones de código establecidas en las rules, y los patrones arquitectónicos definidos en la documentación.

El flujo de trabajo del agente orquestador sigue un proceso estructurado: primero analiza la solicitud para identificar los componentes afectados determinando qué módulos necesitan modificación, luego determina si la tarea requiere colaboración de múltiples subagentes o puede ser manejada por uno solo, a continuación coordina la ejecución secuencial o paralela según las dependencias por ejemplo backend antes que frontend, y finalmente verifica la consistencia de los cambios realizados comparando interfaces y types compartidos. El orquestador también mantiene un registro de decisiones arquitectónicas y puede consultar la documentación cuando necesita clarificación sobre patrones establecidos.

### 10.2 Subagente de Frontend

**Rol:** Desarrollador Frontend Especialista
**Objetivo:** Implementar interfaces de usuario responsivas y accesibles utilizando Next.js, React, y Tailwind CSS

**Responsabilidades:**
- Desarrollar páginas, componentes, y funcionalidades del frontend según especificaciones del PDR y documentación de diseño
- Implementar diseños responsive que funcionen en dispositivos móviles, tablets, y escritorio con breakpoint consistency
- Crear animaciones y transiciones que mejoren la experiencia de usuario sin comprometer rendimiento ni accessibility
- Implementar formularios con validación del lado del cliente y feedback visual apropiado mediante toast y inline errors
- Optimizar rendimiento de frontend mediante code splitting, lazy loading, y optimización de imágenes con next/image
- Escribir tests unitarios con Vitest y tests E2E con Playwright para componentes y flujos críticos

**Contexto Proporcionado:**
- Documentación de diseño UI/UX con wireframes y mockups
- Sistema de diseño y tokens de estilo con componentes en packages/ui-components
- Patrones de componentes establecidos con ejemplos en código existente
- Convenciones de nomenclatura y estructura de archivos definida en project-context.md
- APIs disponibles y sus contratos especificados en sección de APIs

**Herramientas Habilitadas:**
- Acceso completo al código frontend en apps/frontend-*/
- Capacidad de ejecutar linters y formatters con npm run lint y npm run format
- Acceso a entorno de desarrollo local con docker-compose up
- Capacidad de crear archivos temporales para prototipos en /tmp

**Ejemplo de Prompt para el Agente:**
```
Implementa el componente de Carrito de Compras para la carta digital pública. El componente debe:
- Mostrar lista de items seleccionados con imagen, nombre, cantidad, y precio
- Permitir incrementar/decrementar cantidades con límites de stock del producto
- Permitir eliminar items individuales con confirmación para acciones destructivas
- Calcular subtotal, impuestos, y total con lógica de redondeo currency
- Mostrar botón de proceder al checkout con estado disabled si carrito vacío
- Mantener estado sincronizado con localStorage para persistencia entre sesiones
- Usar los componentes UI del sistema de diseño de packages/ui-components
- Ser completamente responsive para móviles con touch targets de 44px mínimo
- Manejar estados de loading durante operaciones asíncronas
```

### 10.3 Subagente de Backend

**Rol:** Desarrollador Backend Especialista
**Objetivo:** Implementar APIs robustas, lógica de negocio, y acceso a datos utilizando Node.js, TypeScript, y PostgreSQL

**Responsabilidades:**
- Desarrollar endpoints de API REST siguiendo los contratos definidos en sección 8
- Implementar lógica de negocio con validaciones y reglas de dominio documentadas
- Diseñar y ejecutar migrations de base de datos con Prisma generate y migrate
- Implementar autenticación y autorización JWT con guards de NestJS
- Escribir tests unitarios para lógica de negocio con覆盖率 sobre 80%
- Documentar APIs con OpenAPI/Swagger annotations en código
- Implementar logging estructurado para diagnóstico en producción

**Contexto Proporcionado:**
- Especificación de APIs y endpoints con paths, methods y schemas de request/response
- Modelo de datos y schema de Prisma en packages/database/schema.prisma
- Patrones de arquitectura hexagonal con controllers, services y repositories
- Configuración de servicios externos como pasarelas de pago y email
- Requisitos de seguridad y validación incluyendo rate limiting y sanitización

**Herramientas Habilitadas:**
- Acceso completo al código backend en apps/*-service/
- Capacidad de ejecutar migraciones de base de datos con npm run db:migrate
- Acceso a logs de aplicación para debugging
- Capacidad de ejecutar tests con npm run test

**Ejemplo de Prompt para el Agente:**
```
Implementa el endpoint POST /api/v1/orders para crear nuevos pedidos. El endpoint debe:
- Validar datos del request contra schema Zod definido en shared/schemas
- Verificar disponibilidad de cada producto consultando inventory en tiempo real
- Calcular totales con impuestos del restaurante y descuentos aplicados
- Crear registro de pedido con estado PENDING en tabla Orders
- Crear registros de order_items con selección de variantes y addons
- Integrar con pasarela de pago si se especifica método electrónico
- Publicar evento OrderCreated al bus de mensajes para notificaciones
- Retornar orden creada con detalles completos y HTTP 201
- Manejar errores con códigos apropiados: 400 para validación, 409 para conflicto stock, 500 para errores
```

### 10.4 Subagente de Infraestructura

**Rol:** Ingeniero de DevOps Especialista
**Objetivo:** Gestionar containerización, CI/CD, y**Responsabilidades:**
 configuración de infraestructura

- Mantener Dockerfiles y docker-compose para todos los servicios con best practices
- Configurar pipelines de CI/CD para build, test, y deployment con GitHub Actions
- Gestionar configuraciones de Kubernetes si aplica con manifests versionados
- Implementar monitoreo y alertas de infraestructura con Prometheus y Grafana
- Configurar backups y recuperación ante desastres con políticas de retención
- Gestionar secretos y configuraciones sensibles con Vault o Kubernetes Secrets
- Documentar procedimientos de deployment y runbooks de operaciones

**Contexto Proporcionado:**
- Arquitectura de microservicios detallada en sección 5
- Requisitos de environment variables documentados en .env.example
- Configuraciones de servicios externos con endpoints y credenciales
- SLAs de disponibilidad de 99.9% y objetivos de rendimiento
- Políticas de seguridad de infraestructura con compliance requirements

**Herramientas Habilitadas:**
- Acceso a archivos de configuración de infraestructura en infra/
- Capacidad de ejecutar comandos Docker y docker-compose
- Acceso a registros de container registry para push/pull imágenes
- Capacidad de modificar archivos de workflow en .github/workflows/

**Ejemplo de Prompt para el Agente:**
```
Configura el pipeline de CI/CD para el servicio de pedidos. El pipeline debe:
- Ejecutar linting con ESLint y formatting con Prettier en cada push a cualquier rama
- Correr tests unitarios con Jest y tests de integración con覆盖率 sobre 80%
- Construir imagen Docker con tagging semántico basado en branch y commit hash
- Ejecutar análisis de seguridad de dependencias con Snyk o Trivy
- Push a registry privado en merges a main branch con versión taggeada
- Desplegar a ambiente de staging automáticamente en push a develop
- Desplegar a producción con approval manual en push a main
- Notificar fallos en canal de Slack con detalles del error
- Generar changelog automático basado en commits desde último release
```

### 10.5 Subagente de Calidad

**Rol:** Ingeniero de Calidad Especialista
**Objetivo:** Asegurar calidad de código mediante testing, revisión, y validación automatizada

**Responsabilidades:**
- Implementar suite de tests unitarios para frontend y backend con Vitest/Jest
- Configurar tests end-to-end para flujos críticos con Playwright
- Implementar testing de contratos de API con Pact o tests de integración
- Configurar análisis estático de código con ESLint, TypeScript strict, y SonarQube
- Mantener cobertura de tests sobre umbrales definidos con reporting
- Documentar estrategias de testing y coverage reports para stakeholders

**Contexto Proporcionado:**
- Estructura de archivos de test en __tests__ y specs/
- Configuración de Vitest/Jest en vitest.config.ts y jest.config.js
- Contratos de API documentados con ejemplos de request/response
- Patrones de test establecidos con Page Objects para E2E y factories para unit tests
- Métricas de calidad objetivo con cobertura sobre 80% y deuda técnica controlada

**Herramientas Habilitadas:**
- Acceso a archivos de código fuente para escribir tests
- Capacidad de ejecutar suites de test con npm run test y npm run test:e2e
- Acceso a resultados de coverage en coverage/lcov-report
- Capacidad de crear archivos de test siguiendo convenciones del proyecto

**Ejemplo de Prompt para el Agente:**
```
Implementa tests end-to-end para el flujo de creación de pedido. Los tests deben:
- Cubrir navegación a carta digital mediante acceso a URL pública
- Selección de productos y adición al carrito con múltiples items
- Personalización de productos con variantes y addons con precios adicionales
- Proceso de checkout con datos de prueba y selección de método de pago
- Verificación de creación de pedido verificando respuesta del servidor
- Verificación de actualización de estado mediante polling del endpoint público
- Usar Playwright con Page Object Model para mantenibilidad
- Configurar test isolation con bases de datos de test y cleanup después de cada test
- Incluir assertions para estados de error como producto no disponible
```

---

## 11. Reglas de Contexto para Claude Code

### 11.1 Contexto General del Proyecto

El contexto siguiente debe incluirse en cada sesión de Claude Code para establecer el marco de referencia del proyecto:

```
PROJECT CONTEXT
================

Project Name: Restaurant Digital Portal
Description: SaaS platform for restaurants to manage digital menus and orders via QR codes
Stack: Next.js 14+, TypeScript, Tailwind CSS, NestJS, PostgreSQL, Redis, Docker
Architecture: Multi-tenant microservices with Next.js frontends

Key Components:
1. Landing Page - Public marketing page for product sales
2. Public Menu - Digital menu accessed via QR codes
3. Restaurant Dashboard - Self-service management panel for restaurant owners
4. Super Admin Dashboard - Platform administration panel
5. Auth Service - User authentication and authorization
6. Restaurant Service - Restaurant and menu management
7. Order Service - Order processing and lifecycle
8. Notification Service - Email, SMS, and push notifications

Database: PostgreSQL with Prisma ORM
Cache: Redis for sessions and caching
Search: PostgreSQL full-text search initially, Elasticsearch if needed

Infrastructure:
- Docker for containerization
- Kubernetes for orchestration (optional, can use Docker Compose for small scale)
- CI/CD via GitHub Actions
- Monitoring via Prometheus/Grafana (optional)

Code Standards:
- TypeScript strict mode enabled
- ESLint + Prettier for code formatting
- Conventional commits
- Feature branch workflow
- PR review required for merges
```

### 11.2 Reglas de Codificación

```
CODING RULES
============

Frontend (Next.js + React):
- Use App Router with Server Components by default
- Client components only when interaction needed (use "use client" sparingly)
- Use TanStack Query for data fetching and caching
- Use Zod for form validation
- Follow component composition patterns
- Use Tailwind CSS utility classes
- Implement proper error boundaries
- Handle loading states with Suspense

Backend (NestJS):
- Use modular architecture with clear separation of concerns
- Implement DTOs with Zod validation
- Use Prisma for database operations
- Implement soft deletes for data preservation
- Log with structured JSON format
- Use pagination for list endpoints
- Implement rate limiting on public endpoints

Database:
- Use Prisma migrations for schema changes
- Add indexes for frequently queried fields
- Soft delete pattern for restaurants, products, orders
- Audit logging for configuration changes
- No sensitive data in plain text

General:
- No console.log in production code - use structured logging
- Use environment variables for configuration
- Document complex logic with comments
- Write self-documenting code
- Keep functions small and focused
- Single responsibility principle
```

### 11. Diseño

```
DES3 Patrones deIGN PATRONS
============ing:
- Use==

Frontend Data Fetch TanStack Query hooks pattern with useQuery and useMutation
- Implement optimistic updates for user interactions like cart updates
- Use infinite scrolling for lists withInfiniteQuery
- use Prefetch data on hover for better UX
- Handle offline scenarios gracefully with cached data

Backend Logic:
- Repository pattern for data access abstraction
- Service layer for business logic encapsulation
- Guard pattern for authorization checks
- Interceptor pattern for cross-cutting concerns
- Exception filter for error handling with standardized responses

State Management:
- Server state: TanStack Query with custom hooks
- Global UI state: Zustand for auth state, theme, etc.
- Form state: React Hook Form + Zod for validation
- URL state: Next.js routing with search params

Error Handling:
- Frontend: Error boundaries + toast notifications with retry actions
- Backend: Typed exceptions + error response format con código, mensaje, y detalles
- API: Consistent error codes 400 para validación, 401 para auth, 403 para forbidden, 404 para not found, 409 para conflicto, 500 para server error

Testing:
- Unit tests para utilidades, hooks, y lógica de negocio
- Integration tests para API endpoints con base de datos real
- E2E tests para critical user flows como crear pedido
- Snapshot tests para components si es necesario, con caution
```

### 11.4 Convenciones de Nombres

```
NAMING CONVENTIONS
==================

Files:
- Components: PascalCase (UserCard.tsx, OrderList.tsx)
- Hooks: camelCase con prefijo "use" (useAuth.ts, useCart.ts)
- Utilities: camelCase (formatCurrency.ts, validateEmail.ts)
- Types: PascalCase (OrderStatus.ts, RestaurantConfig.ts)
- Constants: SCREAMING_SNAKE_CASE (MAX_PRODUCTS, DEFAULT_CURRENCY)
- Config: kebab-case o lowercase (.env.example, .eslintrc.json)

Database:
- Tables: snake_case plural (restaurant_users, order_items)
- Columns: snake_case (created_at, updated_at, is_active)
- Enums: PascalCase (OrderStatus, PaymentType)
- Indexes: idx_<table>_<column> (idx_orders_restaurant_id)

API Endpoints:
- Resources: kebab-case plural (/api/v1/restaurants, /api/v1/products)
- Nested resources: (/api/v1/restaurants/:id/orders, /api/v1/products/:id/variants)
- Actions: (/api/v1/orders/:id/cancel, /api/v1/products/:id/duplicate)

Git:
- Branches: feature/description, fix/issue-number, chore/task-name
- Commits: conventional (feat: add login functionality, fix: resolve cart calculation bug, chore: update dependencies)
- PRs: descriptive titles con contexto (feat(auth): Add Google OAuth support)

Variables:
- Variables/Constants: camelCase (orderTotal, isAvailable)
- Boolean: prefijos is, has, can (isActive, hasPermission, canDelete)
- Arrays: sustantivos plurales (products, orders, categories)
- Objects: sustantivos singulares (orderItem, restaurantConfig)
```

---

## 12. Flujos de Trabajo de Desarrollo

### 12.1 Flujo de Contribución

El proceso de contribución al proyecto sigue un flujo estructurado que garantiza calidad y consistencia en todas las entregas. El desarrollador crea una rama de funcionalidad desde la rama develop con un nombre descriptivo siguiendo las convenciones de nomenclatura establecidas, por ejemplo feature/menu-categories-drag-drop para implementar reordenamiento de categorías mediante drag and drop. Durante el desarrollo, el desarrollador ejecuta linters y tests localmente antes de cada commit para mantener calidad de código y evitar failures en CI, utilizando git hooks pre-commit configurados para automatización.

Al completar la funcionalidad, el desarrollador crea un pull request que debe incluir descripción de cambios con contexto de negocio y técnico, screenshots o videos si hay cambios visuales, lista de tasks completadas del backlog, y tests actualizados o añadidos. El PR debe pasar todos los checks de CI antes de solicitar revisión. El PR es revisado por al menos un miembro del equipo que verifica adherencia a estándares, testing adecuado, documentación de cambios, y keine regressions introducidas. Si el pipeline pasa y la revisión es aprobada con todos los comentarios addressed, el merge se realiza a la rama develop mediante merge commit que preserva historia.

La rama main o main solo acepta merges desde develop y representa el estado desplegable de producción, manteniendo protección de rama que previene push directo. Los despliegues a producción se realizan mediante workflows automatizados que ejecutan migraciones de base de datos primero para backward compatibility, build de contenedores con versiones taggeadas, y rollout gradual a producción con health checks. Los hotfixes siguen un flujo alternativo permitiendo merge directo a main con posterior sync a develop.

### 12.2 Flujo de Release

El proceso de release sigue versioning semántico para numerar versiones de forma significativa siguiendo el patrón MAJOR.MINOR.PATCH. Los cambios que rompen compatibilidad como eliminar endpoints o cambiar estructura de respuesta requieren incremento de MAJOR, nuevas funcionalidades que no rompen compatibilidad requieren incremento de MINOR, y bug fixes y mejoras menores requieren incremento de PATCH. La rama develop mantiene el desarrollo activo y puede contener características no liberadas que están en desarrollo.

Cuando el conjunto de características está completo según roadmap del sprint, se crea un release branch desde develop con nombre release/v1.2.0 para stabilization. Durante el período de estabilización que típicamente dura una a dos semanas, solo se corrigen bugs críticos utilizando labels bug:critical, no se añaden ref nuevas características niactors mayores. Los bug fixes se mergean tanto a release branch como a develop para mantener sincronización.

Una vez estabilizado con todos los bug critical fixed y tests passing, el release se mergea a main con un tag de versión v1.2.0 utilizando git tag -a v1.2.0 -m "Release 1.2.0". El tag触发 el pipeline de deployment a producción automáticamente. Las notas de release se generan automáticamente a partir de los commits合并 utilizando conventional commits, incluyendo nuevas características en feat, correcciones de bugs en fix, y cambios de ruptura con BREAKING CHANGE. El merge de release también se backporta a develop para mantener sincronización y evitar conflictos futuros.

### 12.3 Flujo de Mantenimiento

El mantenimiento continuo incluye actualizaciones regulares de dependencias para recibir parches de seguridad y mejoras de rendimiento. Las actualizaciones menores de patch se evalúan en staging semanalmente y se deployan a producción si pasan tests, típicamente sin revisión profunda. Las actualizaciones menores de minor se evalúan en staging durante dos semanas antes de producción, con revisión de changelog y potential issues. Las actualizaciones mayores de major requieren planificación más cuidadosa con spike de investigación, actualización de código que utiliza APIs deprecated, y testing extenso en staging con stakeholders.

La monitorización de producción mediante dashboards de Grafana y alertas de PagerDuty identifica problemas de rendimiento o errores que requieren atención inmediata. Los alerts están configurados con severidad y escalación apropiada, por ejemplo critical para downtime total con llamada automática, warning para degradación de rendimiento con notificación a Slack. Cuando se identifica un bug crítico en producción, se crea un hotfix branch desde main para corrección inmediata utilizando el flujo de hotfix documentado, con testing acelerado pero no saltándose validación.

El hotfix se prueba en staging específico para hotfix y se despliega a producción lo más rápido posible, idealmente dentro de cuatro horas para critical bugs. El hotfix también se mergea tanto a develop como a cualquier release branch activa para mantener sincronización. Los incidentes se documentan en un registro de lecciones aprendidas en docs/incidents/ para prevenir problemas similares, incluyendo root cause, remediation steps, y acciones preventivas a implementar. La revisión post-incident se realiza dentro de una semana del incidente con todos los involucrados.

---

## 13. Despliegue y Operaciones

### 13.1 Configuración Docker

```dockerfile
# Dockerfile base para aplicaciones Node.js
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### 13.2 Docker Compose para Desarrollo

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-postgres}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-postgres}
      POSTGRES_DB: ${POSTGRES_DB:-restaurant_portal}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  api-gateway:
    build:
      context: ./apps/api-gateway
      dockerfile: Dockerfile
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:postgres@postgres:5432/restaurant_portal
      - REDIS_URL=redis://redis:6379
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy

  frontend-landing:
    build:
      context: ./apps/frontend-landing
      dockerfile: Dockerfile
    ports:
      - "3001:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://api-gateway:4000
    depends_on:
      - api-gateway

  frontend-public:
    build:
      context: ./apps/frontend-public
      dockerfile: Dockerfile
    ports:
      - "3002:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://api-gateway:4000
    depends_on:
      - api-gateway

  frontend-dashboard:
    build:
      context: ./apps/frontend-dashboard
      dockerfile: Dockerfile
    ports:
      - "3003:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://api-gateway:4000
    depends_on:
      - api-gateway

volumes:
  postgres_data:
  redis_data:
```

### 13.3 Variables de Entorno Requeridas

```bash
# Base de datos
DATABASE_URL=postgresql://user:password@localhost:5432/restaurant_portal
DATABASE_URL_TEST=postgresql://user:password@localhost:5432/restaurant_portal_test

# Redis
REDIS_URL=redis://localhost:6379

# Autenticación
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

# Aplicación
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=RestoPortal

# APIs Externas
STRIPE_API_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
SENDGRID_API_KEY=SG.xxx
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_REGION=us-east-1
AWS_S3_BUCKET=restaurant-portal-assets

# Imagenes
NEXT_PUBLIC_CDN_URL=https://cdn.restaurantportal.com

# Email
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=noreply@restaurantportal.com
SMTP_PASSWORD=smtp-password
EMAIL_FROM=noreply@restaurantportal.com

# Características
ENABLE_ANALYTICS=true
ENABLE_NEWSLETTER=true
```

---

## 14. Métricas de Éxito

### 14.1 Métricas de Producto

| Métrica | Definición | Objetivo | Medición |
|---------|-----------|----------|----------|
| Tiempo de carga de carta | Time to First Byte + Largest Contentful Paint | < 2 segundos | Google Analytics |
| Tasa de conversión de pedidos | Pedidos iniciados / Visitas únicas | > 5% | Analytics interno |
| Tasa de completado de checkout | Pedidos completados / Pedidos iniciados | > 70% | Analytics interno |
| NPS de restaurantes | Puntuación de satisfacción de clientes | > 50 | Encuestas trimestrales |
| Retención de restaurantes | Restaurantes activos a 90 días | > 80% | Base de datos |

### 14.2 Métricas Técnicas

| Métrica | Definición | Objetivo | Medición |
|---------|-----------|----------|----------|
| Uptime | Disponibilidad del servicio | > 99.9% | Monitor |
| Tiempo de respuesta API | P95 de latencia de API | < 500ms | APM |
| Error rate | Porcentaje de requests con error | < 1% | Logs |
| Tiempo de deployment | Desde merge hasta producción | < 30 min | CI/CD |
| Cobertura de tests | Líneas cubiertas por tests | > 80% | Coverage report |

### 14.3 Métricas de Negocio

| Métrica | Definición | Objetivo | Medición |
|---------|-----------|----------|----------|
| MRR | Ingresos mensuales recurrentes | Crecimiento mes a mes | Stripe |
| CAC | Costo de adquisición de cliente | < 6 meses de MRR | Marketing |
| LTV | Valor de vida del cliente | > 10x CAC | Finance |
| Churn rate | Porcentaje de restaurantes que cancelan | < 5% mensual | Base de datos |
| Net revenue retention | Ingresos de clientes existentes | > 100% | Finance |

---

## 15. Anexos

### 15.1 Glosario Técnico

| Término | Definición |
|---------|-----------|
| Tenant | Instancia aislada de un cliente dentro de una aplicación multiinquilino, con datos y configuración separados |
| JWT | JSON Web Token, estándar para autenticación stateless basado en claims firmados digitalmente |
| Prisma | ORM moderno para TypeScript con migrations automatizadas, type safety, y query builder intuitivo |
| Server Components | Componentes de React que se ejecutan en el servidor, reduciendo bundle size y mejorando SEO |
| TanStack Query | Biblioteca para gestión de estado de servidor en React con caching, refetching, y optimistics updates |
| Soft Delete | Patrón de eliminación que marca registros como eliminados sin borrarlos físicamente, preservando historia |
| DTO | Data Transfer Object, objeto para transferir datos entre capas con validación de estructura |
| Repository | Patrón de abstracción de acceso a datos que encapsula operaciones de base de datos |
| Multi-tenant | Arquitectura donde múltiples clientes comparten la misma infraestructura con aislamiento de datos |

### 15.2 Referencias Técnicas

El proyecto se basa en documentación oficial de las tecnologías seleccionadas para asegurar implementaciones correctas y actualizadas. La documentación de Next.js proporciona guías exhaustivas sobre App Router, Server Components, y optimización de rendimiento con patrones recomendados. La documentación de NestJS ofrece patrones de arquitectura hexagonal, módulos, manejo de dependencias, y Guards e Interceptors. La documentación de Prisma incluye guías de schema design, migrations, optimización de queries, y configuración de conexiones.

Las mejores prácticas de seguridad se consultan en OWASP para implementación de autenticación, autorización, y protección contra vulnerabilidades comunes como OWASP Top 10. Las prácticas de DevOps se basan en recursos de Docker para containerización best practices y Kubernetes para orquestación. La accesibilidad web sigue las pautas WCAG 2.1 nivel AA para asegurar que la plataforma sea usable por personas con discapacidades, con testing mediante axe-core y Lighthouse. Para internacionalización se considera i18n con next-i18next si el mercado lo requiere en futuras iteraciones.

### 15.3 Estado del Documento

| Aspecto | Valor |
|---------|-------|
| Versión | 1.0.0 |
| Fecha de creación | 2025-12-23 |
| Autor | MiniMax Agent |
| Estado | Borrador para revisión |
| Próxima revisión | Tras feedback inicial del equipo técnico |
| Historial de cambios | Versión inicial del documento PDR completo |

---

*Este documento constituye la especificación técnica completa para el Portal Digital de Restaurantes. Cualquier modificación significativa debe ser aprobada por el equipo técnico y documentada en el historial de cambios del documento. El documento está diseñado para ser utilizado como referencia por desarrolladores y agentes de IA durante la implementación del proyecto.*
