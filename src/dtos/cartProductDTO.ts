import { ApiProperty } from '@nestjs/swagger';
import { ProductDTO } from '../dtos/productDTO';
import { CartDTO } from '../dtos/cartDTO';

export class CartproductDTO {

  @ApiProperty()
  cartproduct_id: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  cartDTO: CartDTO;

  @ApiProperty()
  productDTO: ProductDTO;
}
