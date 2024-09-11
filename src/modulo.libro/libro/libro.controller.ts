import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LibroService } from './libro.service';
import { Libro } from './libro.entity';

@Controller('libro')
export class LibroController {

    constructor(private readonly libroService: LibroService) {}

  // Ruta para eliminar un libro por ID
  @Delete(':id')
  async removeLibro(@Param('id') id: number): Promise<void> {
    return this.libroService.remove(id);
  }

    
 // Ruta para actualizar un libro existente por ID
 @Put(':id')
 async updateLibro(
   @Param('id') id: number,                      // Extrae el ID del libro de la URL
   @Body() updateData: Partial<Libro>,            // Recibe los datos actualizados en el cuerpo de la solicitud
 ): Promise<Libro> {
   return this.libroService.update2(id, updateData);  // Llama al método del servicio para actualizar el libro
 }


// Ruta para asociar categorías a un libro
@Post(':id/categorias')
async addCategoriasToLibro(
  @Param('id') libroId: number,
  @Body('categoriaIds') categoriaIds: number[],
) {
  return this.libroService.addCategoriaToLibro(libroId, categoriaIds);
}

// Ruta para eliminar una categoría de un libro
@Delete(':libroId/categorias/:categoriaId')
async removeCategoriaFromLibro(
  @Param('libroId') libroId: number,
  @Param('categoriaId') categoriaId: number,
): Promise<void> {
  return this.libroService.removeCategoriaFromLibro(libroId, categoriaId);  // Llamada al método en el servicio
}

  @Get()
  async findAll(): Promise<Libro[]> {
    return this.libroService.findAll();
  }

//--------------------------------------------
 /*
@Post()
  async createLibro(@Body() libroData: Partial<Libro>): Promise<Libro> {
    return this.libroService.create(libroData);
  }
//--------------------------------------------
   // Crear un nuevo libro
  @Post()
  async create(@Body() libro: Partial<Libro>): Promise<Libro> {
    return this.libroService.create(libro);
  }

  // Obtener todos los libros

  // Obtener un libro por ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Libro> {
    return this.libroService.findOne(id);
  }

 /*  // Actualizar un libro por ID
  @Put(':id')
  async update(@Param('id') id: number, @Body() libro: Partial<Libro>): Promise<[number, Libro[]]> {
    return this.libroService.update(id, libro);
  }

// Eliminar un libro por ID
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.libroService.remove(id);
  }
*/
    
}
