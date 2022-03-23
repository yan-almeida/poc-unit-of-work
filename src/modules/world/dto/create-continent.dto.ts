import { CreateCountryDto } from 'src/modules/world/dto/create-country.dto';

export class CreateContinentDto {
  name: string;
  color: string;
  countries: CreateCountryDto[];
}
