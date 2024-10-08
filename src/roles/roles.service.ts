import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RolesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      return await this.prismaService.rol.create({
        data: createRoleDto,
      });
    } catch (error) {
      console.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `El rol con el nombre ${createRoleDto.nombre} ya existe`,
          );
        } else if (error.code.startsWith('P20')) {
          //error de validacion
          throw new BadRequestException(error.message);
        }
      }
      //si es otro error que no es de prisma se mostrar el error
      throw new InternalServerErrorException('Error al crear el rol');
    }
  }

  findAll() {
    return this.prismaService.rol.findMany();
  }

  async findOne(id: number) {
    try {
      const rol = await this.prismaService.rol.findUniqueOrThrow({
        where: { id_rol: id },
      });
      return rol;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        // El registro no se encontró
        throw new NotFoundException('El rol no existe');
      } else {
        // Otro error ocurrió
        throw new InternalServerErrorException('Error al buscar el rol');
      }
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const rolActualizado = await this.prismaService.rol.update({
        where: { id_rol: id },
        data: updateRoleDto,
      });

      return rolActualizado;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `Ya existe un rol con el nombre ${updateRoleDto.nombre}`,
          );
        } else if (error.code === 'P2025') {
          throw new NotFoundException('El rol no existe');
        } else if (error.code.startsWith('P20')) {
          throw new BadRequestException(error.message);
        }
      }
      throw new InternalServerErrorException('Error al actualizar el rol');
    }
  }

  async remove(id: number) {
    try {
      const rolEliminado = await this.prismaService.rol.delete({
        where: { id_rol: id },
      });

      return rolEliminado;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('El rol no existe');
        } else if (error.code.startsWith('P20')) {
          throw new BadRequestException(error.message);
        }
      }
      throw new InternalServerErrorException('Error al eliminar el rol');
    }
  }
}
