import { ApiProperty } from '@nestjs/swagger';;
import { MinimartDTO } from '../dtos/minimartDTO';
import { CartproductDTO } from '../dtos/cartproductDTO';

export class CartDTO {

  @ApiProperty()
  id: number;

  @ApiProperty()
  dateArmed: Date;

  @ApiProperty()
  minimartDTO: MinimartDTO;

  @ApiProperty()
  cartproductsDTO: CartproductDTO[];
}
