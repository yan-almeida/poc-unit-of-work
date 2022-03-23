import { UniqueIdentifierEntity } from 'src/common/entities/unique-identifier.entity';
import { Continent } from 'src/modules/world/entities/continent.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Country extends UniqueIdentifierEntity {
  @Column({ length: 150 })
  name: string;

  @Column({ name: 'flag_independent', default: true })
  isIndependent: boolean;

  @ManyToOne(() => Continent, (continent) => continent.countries)
  @JoinColumn({ name: 'continent_id', referencedColumnName: 'id' })
  continent: Continent;
}
