import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
    BelongsToMany,
    AutoIncrement,
  } from 'sequelize-typescript';
import { Autor } from 'src/modulo.autor/autor/autor.entity';
import { Categoria } from 'src/modulo.categoria/categoria/categoria.entity';
import { LibroCategoria } from 'src/modulo.libro_categoria/libro_categoria.entity';
 
  
  @Table
  export class Libro extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
      type: DataType.INTEGER,
      
      allowNull: false,
    })
    id: number;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    titulo: string;
  
    @Column({
      type: DataType.DATE,
      allowNull: false,
    })
    fecha_publicacion: Date;

      // Relación muchos a uno con Autor
  @ForeignKey(() => Autor)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  autor_id: number;

  @BelongsTo(() => Autor)
  autor: Autor;

  // Relación muchos a muchos con Categoria a través de LibroCategoria
  @BelongsToMany(() => Categoria, () => LibroCategoria)
  categorias: Categoria[];
  }
   