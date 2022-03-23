import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { default as TypeormConfig } from './configs/orm.config';
import { WorldModule } from './modules/world/world.module';

@Module({
  imports: [TypeOrmModule.forRoot(TypeormConfig), WorldModule],
})
export class AppModule {}
