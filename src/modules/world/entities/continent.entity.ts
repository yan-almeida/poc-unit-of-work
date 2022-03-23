import { UniqueIdentifierEntity } from 'src/common/entities/unique-identifier.entity';
import { Country } from 'src/modules/world/entities/country.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Continent extends UniqueIdentifierEntity {
  @Column({ length: 150 })
  name: string;

  @Column({ length: 25 })
  color: string;

  @OneToMany(() => Country, (country) => country.continent)
  countries: Country[];
}
