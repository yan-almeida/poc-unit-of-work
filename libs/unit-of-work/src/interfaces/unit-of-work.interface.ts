import { Type } from '@nestjs/common';
import { EntityTarget, Repository } from 'typeorm';

export enum Orm {
  TYPEORM = 'typeorm',
}
export type Work = () => void | Promise<void>;
export interface UnitOfWork {
  start(): Promise<void>;
  complete(work: Work): Promise<void>;
  getRepository<Entity>(target: EntityTarget<Entity>): Repository<Entity>;
}
export type UnitOfWorkFactory = Record<Orm, Type<UnitOfWork>>;
