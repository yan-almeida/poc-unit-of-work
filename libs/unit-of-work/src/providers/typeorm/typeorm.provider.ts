import {
  UnitOfWork,
  Work
} from '@app/unit-of-work/interfaces/unit-of-work.interface';
import { Injectable, Logger } from '@nestjs/common';
import {
  createConnection,
  EntityManager,
  EntityTarget,
  getConnection,
  getConnectionManager,
  getConnectionOptions,
  QueryRunner,
  Repository
} from 'typeorm';

@Injectable()
export class TypeormProvider implements UnitOfWork {
  #logger = new Logger(`@UnitOfWork/${TypeormProvider.name}`);
  #queryRunner: QueryRunner;
  #transactionManager: EntityManager;

  async buildQueryRunner(): Promise<QueryRunner> {
    const hasDefaultConnection = getConnectionManager().has('default');

    if (!hasDefaultConnection) {
      const connectionOptions = await getConnectionOptions();
      const connection = await createConnection(connectionOptions);

      return connection.createQueryRunner();
    }

    const connection = getConnection();
    return connection.createQueryRunner();
  }
  async start(): Promise<void> {
    await this.#setQueryRunner();
    await this.#queryRunner.connect();
    await this.#queryRunner.startTransaction();

    this.#setTransactionManager();
  }
  async complete(work: Work): Promise<void> {
    try {
      await work();
      await this.#queryRunner.commitTransaction();
    } catch (error) {
      await this.#queryRunner.rollbackTransaction();
      this.#logger.error(error);
      throw error;
    } finally {
      await this.#queryRunner.release();
    }
  }
  /**
   * Gets repository for the given entity class or name. If single database connection mode is used, then repository is obtained from the repository aggregator, where each repository is individually created for this entity manager. When single database connection is not used, repository is being obtained from the connection.
   * @param target is your entity
   * @returns a repository
   */
  getRepository<Entity>(target: EntityTarget<Entity>): Repository<Entity> {
    return this.#transactionManager.getRepository(target);
  }
  async #setQueryRunner(): Promise<void> {
    this.#queryRunner = await this.buildQueryRunner();
  }
  #setTransactionManager(): void {
    this.#transactionManager = this.#queryRunner.manager;
  }
}
