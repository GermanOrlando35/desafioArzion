import { MinimartproductDTO } from '../dtos/minimartproductDTO';
import { Minimart } from '../modules/common/entity/minimart';
import { ApiProperty } from '@nestjs/swagger';

export class MinimartDTO {

  constructor(minimart: Minimart){
    this.id = minimart.id;
    this.name = minimart.name;
    this.workDays = minimart.workDays;
    this.openingTime = minimart.openingTime;
    this.closingTime = minimart.closingTime;
    this.address = minimart.address;
    this.logo = minimart.logo;
    if (minimart.minimartproducts) {
      let minimartproductsDTO: MinimartproductDTO[] = [];
      for (let i = 0; i < minimart.minimartproducts.length; i++) {
        const minimartproductDTO: MinimartproductDTO = new MinimartproductDTO(minimart.minimartproducts[i]);
        minimartproductsDTO.push(minimartproductDTO);
      }
      this.minimartproductsDTO = minimartproductsDTO;
    }
  }

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
