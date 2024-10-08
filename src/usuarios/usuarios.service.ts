import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsuariosService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      return await this.prismaService.usuario.create({
        data: {
          nombre: createUsuarioDto.nombre,
          apellido: createUsuarioDto.apellido,
          email: createUsuarioDto.email,
          password_hash: createUsuarioDto.password_hash,
          created_by: createUsuarioDto.created_by,
          updated_by: createUsuarioDto.updated_by,
          is_active: createUsuarioDto.is_active,
          rol: {
            connect: { id_rol: createUsuarioDto.id_rol },
          },
          sucursal: {
            connect: { id_sucursal: createUsuarioDto.id_sucursal },
          },
        },
      });
    } catch (error) {
      console.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `El usuario con el email ${createUsuarioDto.email} ya existe`,
          );
        } else if (error.code.startsWith('P20')) {
          // Error de validación
          throw new BadRequestException(error.message);
        }
      }
      // Si es otro error que no es de Prisma, se muestra el error
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  findAll() {
    return this.prismaService.usuario.findMany({
      include: {
        rol: true,
        sucursal: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
