import { ProductDTO } from '../dtos/productDTO';
import { MinimartDTO } from '../dtos/minimartDTO';
import { ApiProperty } from '@nestjs/swagger';

export class MinimartproductDTO {

  @ApiProperty()
  minimartproduct_id: number;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  minimartDTO: MinimartDTO;

  @ApiProperty()
  productDTO: ProductDTO;
}
