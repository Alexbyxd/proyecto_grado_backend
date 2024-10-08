import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateSucursaleDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  direccion: string;

  @IsString()
  @IsOptional()
  @MaxLength(8)
  telefono: string;

  @IsEmail()
  @IsOptional()
  @MaxLength(50)
  email: string;

  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean;

  @IsNotEmpty()
  @IsInt()
  created_by: number;

  @IsNotEmpty()
  @IsInt()
  updated_by: number;
}
