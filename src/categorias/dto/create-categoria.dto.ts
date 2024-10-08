import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateCategoriaDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  nombre: string;


  @IsOptional()
  @IsString()
  descripicion?: string;

  @IsOptional()
  @IsString()
  genero?: string;

  @IsNotEmpty()
  created_by: number;

  @IsNotEmpty()
  updated_by: number;
}
