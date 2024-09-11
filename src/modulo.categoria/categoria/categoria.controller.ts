import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { Categoria } from './categoria.entity';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto.categoria/create-categoria.dto';

@Controller('categoria')
export class CategoriaController {

    constructor(private readonly categoriaService: CategoriaService) {}


    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))  // Usa el ValidationPipe para validar los datos
    async create2(@Body() createCategoriaDto: CreateCategoriaDto) {
      return this.categoriaService.create(createCategoriaDto);  // Llama al servicio para crear la categoría
    }


  // Ruta para crear una nueva categoría
 /* @Post()
  async create(@Body() categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.create(categoria);
  } */

  // Ruta para obtener todas las categorías
  @Get()
  async findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }

  // Ruta para obtener una categoría por su ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Categoria> {
    return this.categoriaService.findOne(id);
  }

  // Ruta para actualizar una categoría
  @Put(':id')
  async update(@Param('id') id: number, @Body() categoria: Categoria): Promise<[number, Categoria[]]> {
    return this.categoriaService.update(id, categoria);
  }

  // Ruta para eliminar una categoría
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.categoriaService.remove(id);
  }
}
