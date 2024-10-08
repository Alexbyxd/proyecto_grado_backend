import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient{
    //crea una conexion con la base de datos
    async onModuleInit(){
        await this.$connect();
    }
    //cuando se apaga la app cierra la base de datos
    async onModuleDestroy(){
        await this.$disconnect();
    }
}
