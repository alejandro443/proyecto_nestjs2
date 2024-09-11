import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript';
import { Libro } from 'src/modulo.libro/libro/libro.entity';
@Table({
 // timestamps: true,  // Sequelize gestionará automáticamente los campos createdAt y updatedAt
})
export class Autor extends Model {
  @PrimaryKey
  @AutoIncrement  // Genera IDs numéricos automáticamente
  @Column({
    type: DataType.INTEGER,  // Tipo de dato INTEGER para IDs numéricos
    allowNull: false,
  })
  id: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nombre: string;
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  fecha_nacimiento: Date;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nacionalidad: string;

  // Relación uno a muchos con Libro
  @HasMany(() => Libro)
  libros: Libro[];



}