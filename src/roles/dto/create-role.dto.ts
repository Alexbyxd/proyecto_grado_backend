import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    nombre: string

    @IsOptional()
    @IsString()
    descripcion: string
}
