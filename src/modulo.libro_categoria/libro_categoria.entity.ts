import { Table, ForeignKey, Model } from 'sequelize-typescript';
import { Categoria } from 'src/modulo.categoria/categoria/categoria.entity';
import { Libro } from 'src/modulo.libro/libro/libro.entity';

@Table({
  timestamps: true,
})
export class LibroCategoria extends Model {
  // Clave externa que hace referencia a Libro
  @ForeignKey(() => Libro)
  libro_id: number;

  // Clave externa que hace referencia a Categoria
  @ForeignKey(() => Categoria)
  categoria_id: number;
}