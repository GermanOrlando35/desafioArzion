import { ApiProperty } from '@nestjs/swagger';
import { MinimartproductDTO } from '../dtos/minimartproductDTO';
import { CartproductDTO } from '../dtos/cartproductDTO';
import { CategoryDTO } from '../dtos/categoryDTO';
import { Product } from '../modules/common/entity/product';

export class ProductDTO {

  constructor(product: Product){
    this.id = product.id;
    this.name = product.name;
    this.pricing = product.pricing;
    this.description = product.description;
    this.name = product.name;
    this.categoryDTO = new CategoryDTO(product.category);

    /*let minimartproductsDTO: MinimartproductDTO[] = [];
    for (let i = 0; i < product.minimartproducts.length; i++) {
      const minimartproductDTO: MinimartproductDTO = new MinimartproductDTO(product.minimartproducts[i]);
      minimartproductsDTO.push(minimartproductDTO);
    }
    this.minimartproductsDTO = minimartproductsDTO;*/

    /*let cartproductsDTO: CartproductDTO[] = [];
    for (let i = 0; i < product.cartproducts.length; i++) {
      const cartproductDTO: CartproductDTO = new CartproductDTO(product.cartproducts[i]);
      cartproductsDTO.push(cartproductDTO);
    }
    this.cartproductsDTO = cartproductsDTO;*/
  }

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

  /*@ApiProperty()
  minimartproductsDTO: MinimartproductDTO[];*/

  /*@ApiProperty()
  cartproductsDTO: CartproductDTO[];*/
}
