import {Controller,Get,Post,Put, Delete, Param,Body} from '@nestjs/common';
import { MinimartService } from '../../services/minimart/minimart.service';
//import { Minimart } from '../../interfaces/minimart.interface';
import { Minimart } from '../../modules/common/entity/minimart'; //the model object must be hidden


@Controller('minimart')
export class MinimartController {

  constructor(private  minimartService:MinimartService){
  }

  @Post()
  addProdut(@Body() minimart:Minimart):any{

    return this.minimartService.save(minimart);
  }

  @Get()
  getProduct():any{

    return  this.minimartService.findAll();
  }

  @Get(':id')
  getOneProduct(@Param() params):any{
    return this.minimartService.find(params.id);
  }

  @Put(':id')
  updateProduct(@Body() minimart:Minimart,@Param() params):any{
    return   this.minimartService.update(params.id,minimart);
  }

  @Delete(':id')
  deleteProducto( @Param() params):any{
    return  this.minimartService.delete(params.id);
  }

}
