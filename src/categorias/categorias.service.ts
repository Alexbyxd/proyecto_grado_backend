import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriasService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    try {
      return await this.prismaService.categoria.create({
        data: createCategoriaDto,
      });
    } catch (error) {
      console.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `La categoria con el nombre ${createCategoriaDto.nombre} ya existe`,
          );
        } else if (error.code.startsWith('P20')) {
          //error de validacion
          throw new BadRequestException(error.message);
        }
      }
      //si es otro error que no es de prisma se mostrar el error
      throw new InternalServerErrorException('Error al crear la categoria');
    }
  }

  findAll() {
    return this.prismaService.categoria.findMany();
  }

  async findOne(id: number) {
    try {
      const categoria = await this.prismaService.categoria.findUniqueOrThrow({
        where: { id_categoria: id },
      });
      return categoria;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        // El registro no se encontró
        throw new NotFoundException('La categoría no existe');
      } else {
        // Otro error ocurrió
        throw new InternalServerErrorException('Error al buscar la categoría');
      }
    }
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    try {
      const categoriaActualizada = await this.prismaService.categoria.update({
        where: { id_categoria: id },
        data: updateCategoriaDto,
      });

      return categoriaActualizada;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `Ya existe una categoría con el nombre ${updateCategoriaDto.nombre}`,
          );
        } else if (error.code === 'P2025') {
          throw new NotFoundException('La categoría no existe');
        } else if (error.code.startsWith('P20')) {
          throw new BadRequestException(error.message);
        }
      }
      throw new InternalServerErrorException(
        'Error al actualizar la categoría',
      );
    }
  }

  async remove(id: number) {
    try {
      const categoriaEliminada = await this.prismaService.categoria.delete({
        where: {id_categoria:id}
      })

      return categoriaEliminada
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('La categoría no existe');
        } else if (error.code.startsWith('P20')) {
          throw new BadRequestException(error.message);
        }
      }
      throw new InternalServerErrorException('Error al eliminar la categoría');
    }
  }
}
