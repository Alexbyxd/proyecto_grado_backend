import { MiddlewareConsumer, Module } from '@nestjs/common';
import { SucursalesService } from './sucursales.service';
import { SucursalesController } from './sucursales.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggerMiddleware } from 'src/middleware/logger/logger.middleware';

@Module({
  controllers: [SucursalesController],
  providers: [SucursalesService, PrismaService],
})
export class SucursalesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(SucursalesController);
  }
}
