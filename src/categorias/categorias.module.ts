import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggerMiddleware } from 'src/middleware/logger/logger.middleware';

@Module({
  controllers: [CategoriasController],
  providers: [CategoriasService, PrismaService],
})
export class CategoriasModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CategoriasController);
  }
}
