import { TransactionalFactory, TypeormProvider } from '@app/unit-of-work';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Continent } from 'src/modules/world/entities/continent.entity';
import { Country } from 'src/modules/world/entities/country.entity';
import { WorldController } from './world.controller';
import { WorldService } from './world.service';

@Module({
  imports: [TypeOrmModule.forFeature([Country, Continent])],
  controllers: [WorldController],
  providers: [WorldService, TransactionalFactory, TypeormProvider],
  exports: [WorldService, TransactionalFactory, TypeormProvider],
})
export class WorldModule {}
