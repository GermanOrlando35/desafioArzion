import { ApiProperty } from '@nestjs/swagger';

export class CategoryDTO {

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
