import { ApiProperty } from '@nestjs/swagger';
import { ProductDTO } from '../dtos/productDTO';
import { Cartproduct } from '../modules/common/entity/cartproduct';
import { CartDTO } from '../dtos/cartDTO';

export class CartproductDTO {

  constructor(cartproduct: Cartproduct){
    this.cartproduct_id = cartproduct.cartproduct_id;
    this.quantity = cartproduct.quantity;
    this.cartDTO = new CartDTO(cartproduct.cart);
    this.productDTO = new ProductDTO(cartproduct.product);
  }

  @ApiProperty()
  cartproduct_id: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  cartDTO: CartDTO;

  @ApiProperty()
  productDTO: ProductDTO;
}
