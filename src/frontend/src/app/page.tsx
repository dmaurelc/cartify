export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-r from-primary to-accent rounded-lg text-white p-8">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a PDR</h1>
        <p className="text-lg mb-8">Portal Digital de Restaurantes - Plataforma SaaS para menús digitales</p>
        <div className="flex gap-4 justify-center">
          <button className="bg-white text-primary px-6 py-2 rounded-lg font-semibold hover:bg-gray-100">
            Comenzar
          </button>
          <button className="border-2 border-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-primary">
            Aprender más
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <div className="text-4xl mb-4">📱</div>
          <h3 className="text-xl font-bold mb-2">Menú Digital</h3>
          <p className="text-gray-600">Accesible via código QR desde cualquier dispositivo</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <div className="text-4xl mb-4">🛒</div>
          <h3 className="text-xl font-bold mb-2">Pedidos en Línea</h3>
          <p className="text-gray-600">Sistema completo de carrito y checkout</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <div className="text-4xl mb-4">💳</div>
          <h3 className="text-xl font-bold mb-2">Pagos Seguros</h3>
          <p className="text-gray-600">Múltiples métodos de pago integrados</p>
        </div>
      </section>

      {/* Status */}
      <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">Estado del Proyecto</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded border border-blue-100">
            <p className="text-sm text-gray-600">Versión</p>
            <p className="text-lg font-bold text-blue-600">0.1.0</p>
          </div>
          <div className="bg-white p-4 rounded border border-blue-100">
            <p className="text-sm text-gray-600">Phase</p>
            <p className="text-lg font-bold text-blue-600">Setup</p>
          </div>
          <div className="bg-white p-4 rounded border border-blue-100">
            <p className="text-sm text-gray-600">Status</p>
            <p className="text-lg font-bold text-green-600">🟢 Activo</p>
          </div>
          <div className="bg-white p-4 rounded border border-blue-100">
            <p className="text-sm text-gray-600">Node Version</p>
            <p className="text-lg font-bold text-blue-600">20+</p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Próximos Pasos</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Completar scaffold de Backend (NestJS)</li>
          <li>Configurar Database (PostgreSQL)</li>
          <li>Setup Docker y Docker Compose</li>
          <li>Configurar GitHub Actions CI/CD</li>
          <li>Implementar primeras features de la Landing Page</li>
        </ol>
      </section>
    </div>
  );
}
