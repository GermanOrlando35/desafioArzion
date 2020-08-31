import {Controller, Get,Post,Put, Delete, Param,Body, Req, Inject, UseGuards} from '@nestjs/common';
import {ApiTags, ApiResponse} from '@nestjs/swagger';
import { Request } from 'express';
import {AuthGuard} from '../../security/auth.guard';
import { MinimartService } from '../../services/minimart/minimart.service';
import { MinimartDTO } from '../../dtos/minimartDTO';

@Controller('minimarts')
@ApiTags('minimart')
@UseGuards(AuthGuard)
export class MinimartController {

  @Inject()
  private readonly minimartService:MinimartService;

  @Post()
  addMinimart(@Body() minimartDTO:MinimartDTO):any{
    return this.minimartService.save(minimartDTO);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'All minimarts or selected depending on the parameter',
  })
  getMinimart(@Req() req: Request):any{
    try{
      //2-Be able to query available stores at a certain time in the day and return only those that apply
      if (req.query.hour !== undefined) {
        return this.minimartService.findByHours(req.query.hour);
      }else{
        return  this.minimartService.findAll();
      }
    }catch(error){
      return{
        success: false,
        data: {},
        errors: [error],
        warninigs: []
      };
    }
  }

  @Get(':id')
  getOneMinimart(@Param() params):any{
    return this.minimartService.find(params.id);
  }

  @Put(':id')
  updateMinimart(@Body() minimartDTO:MinimartDTO,@Param() params):any{
    return   this.minimartService.update(params.id,minimartDTO);
  }

  @Delete(':id')
  deleteMinimart( @Param() params):any{
    return  this.minimartService.delete(params.id);
  }

  //4-Be able to query if a product is available, at a certain store, and return that product's info
  @Get(":id/products/:idProduct")
  @ApiResponse({
    status: 200,
    description: 'Product for a minimart',
  })
  getProductByIdInMinimart(@Param() params):any{
    try{
      return this.minimartService.findProductByIdInMinimart(params.id, params.idProduct);
    }catch(error){
      return{
        success: false,
        data: {},
        errors: [error],
        warninigs: []
      };
    }
  }

  //5-Be able to query available products for a particular store
  @Get(":id/products")
  @ApiResponse({
    status: 200,
    description: 'All products for a minimart',
  })
  getProductsByMinimart(@Param() params):any{
    try{
      return this.minimartService.findProdutcsByMinimart(params.id);
    }catch(error){
      return{
        success: false,
        data: {},
        errors: [error],
        warninigs: []
      };
    }
  }
}
