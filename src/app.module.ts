import { Module } from '@nestjs/common';
import { CategoriasModule } from './categorias/categorias.module';
import { PrismaService } from './prisma/prisma.service';
import { RolesModule } from './roles/roles.module';
import { SucursalesModule } from './sucursales/sucursales.module';
import { UsuariosModule } from './usuarios/usuarios.module';


@Module({
  imports: [CategoriasModule, RolesModule, SucursalesModule, UsuariosModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
