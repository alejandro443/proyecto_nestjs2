import { Module } from '@nestjs/common';
import { LibroService } from './libro.service';
import { LibroController } from './libro.controller';
import { Libro } from './libro.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Categoria } from 'src/modulo.categoria/categoria/categoria.entity';
import { LibroCategoria } from 'src/modulo.libro_categoria/libro_categoria.entity';

@Module({
  imports: [SequelizeModule.forFeature([Libro,Categoria,LibroCategoria])],
  providers: [LibroService],
  controllers: [LibroController]
})
export class LibroModule {}
