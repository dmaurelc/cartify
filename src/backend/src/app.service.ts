import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: '0.1.0',
    };
  }

  getInfo() {
    return {
      name: 'PDR API',
      description: 'Portal Digital de Restaurantes - Backend API',
      version: '0.1.0',
      status: 'running',
      environment: process.env.NODE_ENV || 'development',
      documentation: '/api/docs',
    };
  }
}
