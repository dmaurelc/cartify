import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PDR - Portal Digital de Restaurantes',
  description:
    'Plataforma SaaS para la digitalización completa de menús y gestión de pedidos en restaurantes',
  keywords: ['restaurante', 'menú digital', 'pedidos online', 'código QR', 'saas'],
  authors: [{ name: 'PDR Team' }],
  viewport: 'width=device-width, initial-scale=1.0',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    title: 'PDR - Portal Digital de Restaurantes',
    description: 'Plataforma para digitalizar tu restaurante',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-white shadow">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-primary">PDR</h1>
                <div className="text-sm text-gray-600">v0.1.0</div>
              </div>
            </nav>
          </header>

          <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>

          <footer className="bg-gray-100 border-t border-gray-200 mt-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-gray-600 text-sm">
              <p>&copy; 2025 PDR - Portal Digital de Restaurantes. Todos los derechos reservados.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
