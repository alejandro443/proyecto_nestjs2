import { IsString, IsOptional, Validate } from 'class-validator';
import { IsCategoryUniqueConstraint } from './unique-category.validator';  // Validador personalizado

export class UpdateCategoriaDto {
  @IsString()
  @IsOptional()  // El campo nombre es opcional al actualizar
  @Validate(IsCategoryUniqueConstraint)  // Si se proporciona un nuevo nombre, valida que sea único
  nombre?: string;
}