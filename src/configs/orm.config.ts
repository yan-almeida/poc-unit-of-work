import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export default {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '123',
  database: process.env.DB_DATABASE || 'unit-of-work',
  entities: [process.env.DB_ENTITIES || 'dist/**/*.entity.js'],
  autoLoadEntities: true,
  synchronize: true,
  dropSchema: false,
  migrationsRun: true,
  logging: true,
  logger: 'advanced-console',
  entityPrefix: 'tb_',
  migrations: [
    join(__dirname, process.env.DB_MIGRATIONS || '../migrations/*{.ts,.js}'),
  ],
  cli: {
    migrationsDir: process.env.DB_ENTITIES_DIR || './src/migrations',
  },
  seeds: [join(__dirname, process.env.DB_SEEDS || '../seeds/*.seed.{.ts,.js}')],
} as TypeOrmModuleOptions;
