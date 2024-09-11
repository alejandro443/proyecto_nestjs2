import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { Categoria } from './categoria.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { IsCategoryUniqueConstraint } from './dto.categoria/unique-category.validator';


@Module({
  imports: [SequelizeModule.forFeature([Categoria])], 

  providers: [CategoriaService,IsCategoryUniqueConstraint],
  controllers: [CategoriaController]
  
})
export class CategoriaModule {}
