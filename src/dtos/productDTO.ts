import { ApiProperty } from '@nestjs/swagger';
import { MinimartproductDTO } from '../dtos/minimartproductDTO';
import { CartproductDTO } from '../dtos/cartproductDTO';
import { CategoryDTO } from '../dtos/categoryDTO';

export class ProductDTO {

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  pricing: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  categoryDTO: CategoryDTO;

  @ApiProperty()
  minimartproductsDTO: MinimartproductDTO[];

  @ApiProperty()
  cartproductsDTO: CartproductDTO[];
}
