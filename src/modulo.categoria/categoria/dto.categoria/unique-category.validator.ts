import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Categoria } from '../categoria.entity';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsCategoryUniqueConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectModel(Categoria)  // Asegúrate de que esta inyección esté bien configurada
    private readonly categoriaModel: typeof Categoria,
  ) {}

  async validate(nombre: string, args: ValidationArguments): Promise<boolean> {
    const categoria = await this.categoriaModel.findOne({ where: { nombre } });  // Asegúrate de que findOne esté disponible
    return !categoria;  // Retorna `true` si la categoría no existe (es decir, es única)
  }

  defaultMessage(args: ValidationArguments): string {
    return `La categoría con el nombre "${args.value}" ya existe.`;  // Mensaje de error si el nombre no es único
  }
}
