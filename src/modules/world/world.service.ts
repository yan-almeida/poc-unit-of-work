import { TransactionalFactory } from '@app/unit-of-work';
import { Orm } from '@app/unit-of-work/interfaces/unit-of-work.interface';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateContinentDto } from 'src/modules/world/dto/create-continent.dto';
import { CreateCountryDto } from 'src/modules/world/dto/create-country.dto';
import { Continent } from 'src/modules/world/entities/continent.entity';
import { Country } from 'src/modules/world/entities/country.entity';
import { Repository } from 'typeorm';
import { CreateWorldDto } from './dto/create-world.dto';

@Injectable()
export class WorldService {
  #continentRepo: Repository<Continent>;
  #countryRepo: Repository<Country>;

  constructor(
    @InjectRepository(Continent)
    private readonly _continentRepo: Repository<Continent>,
    private readonly _transactionalFactory: TransactionalFactory,
  ) {}

  async createWord(dto: CreateWorldDto): Promise<Continent[]> {
    const transaction = this._transactionalFactory.build(Orm.TYPEORM);

    await transaction.start();

    const work = async () => {
      this.#continentRepo = transaction.getRepository(Continent);
      this.#countryRepo = transaction.getRepository(Country);

      await this.#createContinents(dto.continents);
    };

    await transaction.complete(work);

    return this.findAll();
  }
  async #createContinents(continents: CreateContinentDto[]): Promise<void> {
    for (const { countries, ...continent } of continents) {
      const continentToSave = this.#continentRepo.create(continent);
      const savedContinent = await this.#continentRepo.save(continentToSave);

      await this.#createCountries(countries, savedContinent);

      // i will fail and nothing will be saved 😁
      // hide this exception to save all
      throw new BadRequestException(
        'Falhando após salvar o primeiro continente e seus demais países... 😢',
      );
    }
  }
  async #createCountries(
    countries: CreateCountryDto[],
    continent: Continent,
  ): Promise<void> {
    const countriesToSave = countries.map((country) =>
      this.#countryRepo.create({
        ...country,
        continent,
      }),
    );

    await this.#countryRepo.save(countriesToSave);
  }
  findAll(): Promise<Continent[]> {
    return this._continentRepo.find({ relations: ['countries'] });
  }
}
