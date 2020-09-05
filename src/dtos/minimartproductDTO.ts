import { ProductDTO } from '../dtos/productDTO';
import { MinimartDTO } from '../dtos/minimartDTO';
import { Minimartproduct } from '../modules/common/entity/minimartproduct';
import { ApiProperty } from '@nestjs/swagger';

export class MinimartproductDTO {

  constructor(minimartProduct: Minimartproduct){
    this.minimartproduct_id = minimartProduct.minimartproduct_id;
    this.stock = minimartProduct.stock;
    this.minimartDTO = new MinimartDTO(minimartProduct.minimart);
    this.productDTO = new ProductDTO(minimartProduct.product);
  }

  @ApiProperty()
  minimartproduct_id: number;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  minimartDTO: MinimartDTO;

  @ApiProperty()
  productDTO: ProductDTO;
}
