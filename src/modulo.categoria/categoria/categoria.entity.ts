import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    BelongsToMany,
    AutoIncrement,
  } from 'sequelize-typescript';
import { Libro } from 'src/modulo.libro/libro/libro.entity';
import { LibroCategoria } from 'src/modulo.libro_categoria/libro_categoria.entity';
 // import { Libro } from 'src/libro/libro.entity';
 // import { LibroCategoria } from 'src/libro/libro-categoria.entity';
  
  @Table
  export class Categoria extends Model {
    @PrimaryKey
    @AutoIncrement 
    @Column({
      type: DataType.INTEGER,
      
      allowNull: false,
    })
    id: string;
  
    @Column({
      type: DataType.STRING,
      unique: true,
      allowNull: false,
    })
    nombre: string;
  
      // Relación muchos a muchos con Libro a través de LibroCategoria
  @BelongsToMany(() => Libro, () => LibroCategoria)
  libros: Libro[];
  }
 