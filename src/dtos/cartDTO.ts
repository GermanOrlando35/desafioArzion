import { ApiProperty } from '@nestjs/swagger';;
import { MinimartDTO } from '../dtos/minimartDTO';
import { CartproductDTO } from '../dtos/cartproductDTO';
import { Cart } from '../modules/common/entity/cart';

export class CartDTO {

  constructor(cart: Cart){
    this.id = cart.id;
    this.dateArmed = cart.dateArmed;
    this.minimartDTO = new MinimartDTO(cart.minimart);
    let cartProductsDTO: CartproductDTO[] = [];
    for (let i = 0; i < cart.cartproducts.length; i++) {
      const cartProductDTO: CartproductDTO = new CartproductDTO(cart.cartproducts[i]);
      cartProductsDTO.push(cartProductDTO);
    }
    this.cartproductsDTO = cartProductsDTO;
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  dateArmed: Date;

  @ApiProperty()
  minimartDTO: MinimartDTO;

  @ApiProperty()
  cartproductsDTO: CartproductDTO[];
}
