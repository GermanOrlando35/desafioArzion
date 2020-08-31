import { MinimartproductDTO } from '../dtos/minimartproductDTO';
import { ApiProperty } from '@nestjs/swagger';

export class MinimartDTO {

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  workDays: string;

  @ApiProperty()
  openingTime: number;

  @ApiProperty()
  closingTime: number;

  @ApiProperty()
  address: string;

  @ApiProperty()
  logo: string;

  @ApiProperty()
  minimartproductsDTO: MinimartproductDTO[];
}
