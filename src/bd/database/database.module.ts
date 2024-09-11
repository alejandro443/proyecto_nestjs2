import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Autor } from 'src/modulo.autor/autor/autor.entity';
import { Categoria } from 'src/modulo.categoria/categoria/categoria.entity';
import { Libro } from 'src/modulo.libro/libro/libro.entity';
import { LibroCategoria } from 'src/modulo.libro_categoria/libro_categoria.entity';
// Importa el modelo User u otros que tengas


@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'BD_PRACTICA',
      autoLoadModels: true,  // Sincroniza automáticamente los modelos
      synchronize: true,  // Sincroniza la base de datos con los modelos. No recomendable en producción
      models: [Autor,Categoria,Libro,LibroCategoria],  // Lista de modelos que quieres sincronizar ,Categoria,Libro
    }),
  ],
})
export class DatabaseModule {}