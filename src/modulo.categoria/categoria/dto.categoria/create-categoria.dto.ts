import { IsString, IsNotEmpty, Validate } from 'class-validator';
import { IsCategoryUniqueConstraint } from './unique-category.validator';
 // Validador de unicidad (personalizado)

export class CreateCategoriaDto {
  @IsString()        // Valida que sea una cadena de texto
  @IsNotEmpty()      // Valida que no esté vacío
  @Validate(IsCategoryUniqueConstraint)  // Valida que sea único en la base de datos
  nombre: string;
}