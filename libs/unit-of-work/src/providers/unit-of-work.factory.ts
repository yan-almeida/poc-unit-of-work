import {
  Orm,
  UnitOfWorkFactory
} from '@app/unit-of-work/interfaces/unit-of-work.interface';
import { TypeormProvider } from '@app/unit-of-work/providers/typeorm/typeorm.provider';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class TransactionalFactory {
  #ormStrategy: UnitOfWorkFactory = {
    [Orm.TYPEORM]: TypeormProvider,
  };

  constructor(private readonly moduleRef: ModuleRef) {}

  build(ormType: Orm) {
    const orm = this.#ormStrategy[ormType];

    return this.moduleRef.get(orm);
  }
}
