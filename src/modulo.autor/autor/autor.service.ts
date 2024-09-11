import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Autor } from './autor.entity';
import { Libro } from 'src/modulo.libro/libro/libro.entity';

@Injectable()
export class AutorService {

  constructor(
    @InjectModel(Autor)
    private readonly autorModel: typeof Autor,  // Inyecta el modelo Autor
  ) {}

  // Obtener todos los autores
  async findAll(): Promise<Autor[]> {
    return this.autorModel.findAll();
  }

  // Obtener un autor por ID
 /* async findOne(id: number): Promise<Autor> {   //nome pide por id en el caso
  }
 */

  // Obtener un autor por ID e incluir sus libros
  async findOne2(id: number): Promise<Autor> {
    const autor = await this.autorModel.findByPk(id, {
      include: [{ model: Libro }],  // Incluye los libros relacionados
    });
    
    if (!autor) {
      throw new NotFoundException(`Autor con ID ${id} no encontrado.`);
    }
    
    return autor;
  }



  // Crear un nuevo autor
  async create(autor: Autor): Promise<Autor> {
    const autorData = {
      nombre: autor.nombre,
      fecha_nacimiento: autor.fecha_nacimiento,
      nacionalidad: autor.nacionalidad,
    };
    return this.autorModel.create(autorData); 
  }

  // Actualizar un autor
  async update(id: number, autor: Autor): Promise<[number, Autor[]]> {
    return this.autorModel.update(autor, {
      where: { id },
      returning: true,
    });
  }

  // Eliminar un autor
  async remove(id: number): Promise<void> {
    const autor = await this.findOne2(id);
    if (autor) {
      await autor.destroy();
    }
  }

}
