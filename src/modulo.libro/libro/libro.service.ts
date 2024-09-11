import { Delete, Injectable, NotFoundException, Param } from '@nestjs/common';
import { Libro } from './libro.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Categoria } from 'src/modulo.categoria/categoria/categoria.entity';

@Injectable()
export class LibroService {

    constructor(
        @InjectModel(Libro)
        private readonly libroModel: typeof Libro, // Inyecta el modelo Libro 
        
        @InjectModel(Categoria)
         private readonly categoriaModel: typeof Categoria,
        
      ) {}



        // Método para eliminar un libro por ID
  async remove(id: number): Promise<void> {
    // Busca el libro por ID
    const libro = await this.libroModel.findByPk(id);
    if (!libro) {
      throw new NotFoundException(`Libro con ID ${id} no encontrado.`);
    }

    // Elimina el libro
    await libro.destroy();  // Esto también elimina las relaciones en la tabla intermedia (como LibroCategoria)
  }
//--------------------------------------------------------------------------

        // Método para actualizar un libro por ID
  async update2(id: number, updateData: Partial<Libro>): Promise<Libro> {
    const { categorias, ...libroDetails } = updateData;

    // Busca el libro por ID
    const libro = await this.libroModel.findByPk(id);
    if (!libro) {
      throw new NotFoundException(`Libro con ID ${id} no encontrado.`);
    }

    // Actualiza los detalles del libro
    await libro.update(libroDetails);

    // Si se proporcionan categorías, actualiza las relaciones
    if (categorias && categorias.length > 0) {
      const categoriasEncontradas = await this.categoriaModel.findAll({
        where: { id: categorias },
      });
      await libro.$set('categorias', categoriasEncontradas);  // Actualiza la relación con las categorías
    }
    // Retorna el libro actualizado
    return libro;
  }

  // Método para agregar categorías a un libro
  async addCategoriaToLibro(libroId: number, categoriaIds: number[]): Promise<Libro> {
    const libro = await this.libroModel.findByPk(libroId);
    if (!libro) {
      throw new NotFoundException(`Libro con ID ${libroId} no encontrado.`);
    }

    const categorias = await this.categoriaModel.findAll({
      where: { id: categoriaIds },
    });

    if (categorias.length === 0) {
      throw new NotFoundException(`Categorías no encontradas.`);
    }

    // Asocia las categorías al libro (esto actualiza la tabla intermedia)
    await libro.$set('categorias', categorias);  // Sobreescribe las categorías actuales
    return libro;
  }


  // Método para eliminar una categoría de un libro
  async removeCategoriaFromLibro(libroId: number, categoriaId: number): Promise<void> {
    const libro = await this.libroModel.findByPk(libroId);
    if (!libro) {
      throw new NotFoundException(`Libro con ID ${libroId} no encontrado.`);
    }

    const categoria = await this.categoriaModel.findByPk(categoriaId);
    if (!categoria) {
      throw new NotFoundException(`Categoría con ID ${categoriaId} no encontrada.`);
    }

    // Elimina la categoría del libro (actualiza la tabla intermedia)
    await libro.$remove('categorias', categoria);
  }
 
//----------------------------------------------------------
   // Método para crear un libro con categorias y autor_id
   async create2(libroData: Partial<Libro>): Promise<Libro> {
    const { categorias, ...libroDetails } = libroData;

    // Crea el libro con autor_id
    const libro = await this.libroModel.create(libroDetails);

    // Asociar las categorías si se proporcionan
    if (categorias && categorias.length > 0) {
      const categoriasEncontradas = await this.categoriaModel.findAll({
        where: { id: categorias },
      });
      await libro.$set('categorias', categoriasEncontradas);  // Asocia las categorías
    }

    return libro;
  }


 //----------------------------------------------------------
 // Obtener todos los libros
      async findAll(): Promise<Libro[]> {
        return this.libroModel.findAll();
      }

/*


    
      // Crear un nuevo libro
      async create(libro: Partial<Libro>): Promise<Libro> {
        return this.libroModel.create(libro);
      }
    
     
    
      // Obtener un libro por su ID
      async findOne(id: number): Promise<Libro> {
        return this.libroModel.findByPk(id);
      }
    
      // Actualizar un libro por su ID
      async update(id: number, libro: Partial<Libro>): Promise<[number, Libro[]]> {
        return this.libroModel.update(libro, {
          where: { id },
          returning: true,
        });
      }
    
      // Eliminar un libro por su ID
      async remove(id: number): Promise<void> {
        const libro = await this.findOne(id);
        if (libro) {
          await libro.destroy();
        }
      }
      */

}
