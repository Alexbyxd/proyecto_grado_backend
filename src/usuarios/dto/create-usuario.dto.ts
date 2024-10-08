import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  apellido: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  email:string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password_hash:string

  @IsInt()
  @IsNotEmpty()
  id_rol:number

  @IsInt()
  @IsNotEmpty()
  id_sucursal:number

  @IsInt()
  @IsNotEmpty()
  created_by:number

  @IsInt()
  @IsNotEmpty()
  updated_by:number

  @IsBoolean()
  @IsNotEmpty()
  is_active:boolean
}
