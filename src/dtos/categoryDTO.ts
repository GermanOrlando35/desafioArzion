import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../modules/common/entity/category';

export class CategoryDTO {

  constructor(category: Category){
    this.id = category.id;
    this.name = category.name;
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
