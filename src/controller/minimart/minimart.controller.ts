import {Controller,Get,Post,Put, Delete, Param,Body, Req} from '@nestjs/common';
import { Request } from 'express';
import { MinimartService } from '../../services/minimart/minimart.service';
//import { Minimart } from '../../interfaces/minimart.interface';
import { Minimart } from '../../modules/common/entity/minimart'; //the model object must be hidden

@Controller('minimart')
export class MinimartController {

  constructor(private  minimartService:MinimartService){
  }

  @Post()
  addMinimart(@Body() minimart:Minimart):any{
    return this.minimartService.save(minimart);
  }

  @Get()
  getMinimart(@Req() req: Request):any{
    //2-Be able to query available stores at a certain time in the day and return only those that apply
    if (req.query.hour !== undefined) {
      return this.minimartService.findByHours(req.query.hour);
    }else{
      return  this.minimartService.findAll();
    }
  }

  @Get(':id')
  getOneMinimart(@Param() params):any{
    return this.minimartService.find(params.id);
  }

  @Put(':id')
  updateMinimart(@Body() minimart:Minimart,@Param() params):any{
    return   this.minimartService.update(params.id,minimart);
  }

  @Delete(':id')
  deleteMinimart( @Param() params):any{
    return  this.minimartService.delete(params.id);
  }

  //4-Be able to query if a product is available, at a certain store, and return that product's info
  @Get(":id/product/:idProduct")
  getProductByIdInMinimart(@Param() params):any{
    return this.minimartService.findProductByIdInMinimart(params.id, params.idProduct);
  }

  //5-Be able to query available products for a particular store
  @Get(":id/products")
  getProductsByMinimart(@Param() params):any{
    return this.minimartService.findProdutcsByMinimart(params.id);
  }
}
