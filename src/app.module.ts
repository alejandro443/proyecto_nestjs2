import { Module } from '@nestjs/common';
import { DatabaseModule } from './bd/database/database.module';
import { AutorModule } from './modulo.autor/autor/autor.module';
import { CategoriaModule } from './modulo.categoria/categoria/categoria.module';
import { LibroModule } from './modulo.libro/libro/libro.module';


@Module({
  imports: [
    
    DatabaseModule,
    AutorModule ,
    CategoriaModule,
    LibroModule
    // se importo la base de datos al modulo
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
