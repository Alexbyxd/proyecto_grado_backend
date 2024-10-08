import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSucursaleDto } from './dto/create-sucursale.dto';
import { UpdateSucursaleDto } from './dto/update-sucursale.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SucursalesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createSucursaleDto: CreateSucursaleDto) {
    try {
      return await this.prismaService.sucursal.create({
        data: createSucursaleDto,
      });
    } catch (error) {
      console.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `La sucursal con el nombre ${createSucursaleDto.nombre} ya existe`,
          );
        } else if (error.code.startsWith('P20')) {
          //error de validacion
          throw new BadRequestException(error.message);
        }
      }
      //si es otro error que no es de prisma se mostrar el error
      throw new InternalServerErrorException('Error al crear la sucursal');
    }
  }

  findAll() {
    return this.prismaService.sucursal.findMany();
  }

  async findOne(id: number) {
    try {
      const sucursal = await this.prismaService.sucursal.findUniqueOrThrow({
        where: { id_sucursal: id },
      });
      return sucursal;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        // El registro no se encontró
        throw new NotFoundException('La sucursal no existe');
      } else {
        // Otro error ocurrió
        throw new InternalServerErrorException('Error al buscar la sucursal');
      }
    }
  }

  async update(id: number, updateSucursaleDto: UpdateSucursaleDto) {
    try {
      const sucursalActualizada = await this.prismaService.sucursal.update({
        where: { id_sucursal: id },
        data: updateSucursaleDto,
      });

      return sucursalActualizada;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `Ya existe una sucursal con el nombre ${updateSucursaleDto.nombre}`,
          );
        } else if (error.code === 'P2025') {
          throw new NotFoundException('La sucursal no existe');
        } else if (error.code.startsWith('P20')) {
          throw new BadRequestException(error.message);
        }
      }
      throw new InternalServerErrorException('Error al actualizar la sucursal');
    }
  }

  async remove(id: number) {
    try {
      const sucursalEliminada = await this.prismaService.sucursal.delete({
        where: { id_sucursal: id },
      });

      return sucursalEliminada;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('La sucursal no existe');
        } else if (error.code.startsWith('P20')) {
          throw new BadRequestException(error.message);
        }
      }
      throw new InternalServerErrorException('Error al eliminar la sucursal');
    }
  }
}
