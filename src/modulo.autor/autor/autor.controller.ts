import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AutorService } from './autor.service';
import { Autor } from './autor.entity';

@Controller('autor')
export class AutorController {

  constructor(private readonly autorService: AutorService) {}

  // Obtener todos los autores
  @Get()
  findAll(): Promise<Autor[]> {
    return this.autorService.findAll();
  }

  // Obtener un autor por ID
 /* @Get(':id')
  findOne(@Param('id') id: number): Promise<Autor> {
    return this.autorService.findOne(id);
  } */

  // Obtener un autor por ID junto con sus libros
  @Get(':id')
  async findOne2(@Param('id') id: number): Promise<Autor> {
    return this.autorService.findOne2(id);
  }



  // Crear un nuevo autor
  @Post()
  create(@Body() autor: Autor): Promise<Autor> {
    return this.autorService.create(autor);
  }

  // Actualizar un autor
  @Put(':id')
  update(@Param('id') id: number, @Body() autor: Autor): Promise<[number, Autor[]]> {
    return this.autorService.update(id, autor);
  }

  // Eliminar un autor
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.autorService.remove(id);
  }
}
