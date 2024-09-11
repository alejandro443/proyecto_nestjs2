import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Categoria } from './categoria.entity';

@Injectable()
export class CategoriaService {


    constructor(
        @InjectModel(Categoria)
        private readonly categoriaModel: typeof Categoria,  // Inyecta el modelo Categoria
      ) {}
    
      // Crear una nueva categoría
      async create(categoriaData: Partial<Categoria>): Promise<Categoria> {
        const categoria = await this.categoriaModel.create({
          nombre: categoriaData.nombre,  // Pasa solo el campo 'nombre'
        });
        return categoria;
      }
    
      // Obtener todas las categorías
      async findAll(): Promise<Categoria[]> {
        return this.categoriaModel.findAll();
      }
    
      // Obtener una categoría por ID
      async findOne(id: number): Promise<Categoria> {
        return this.categoriaModel.findByPk(id);
      }
    
      // Actualizar una categoría
      async update(id: number, categoria: Categoria): Promise<[number, Categoria[]]> {
        return this.categoriaModel.update(categoria, {
          where: { id },
          returning: true,
        });
      }
    
      // Eliminar una categoría
      async remove(id: number): Promise<void> {
        const categoria = await this.findOne(id);
        if (categoria) {
          await categoria.destroy();
        }
      }
}
