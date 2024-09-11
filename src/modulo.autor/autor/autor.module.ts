import { Module } from '@nestjs/common';
import { AutorService } from './autor.service';
import { AutorController } from './autor.controller';
import { Autor } from './autor.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Autor])], 
  providers: [AutorService],
  controllers: [AutorController]
})
export class AutorModule {}
