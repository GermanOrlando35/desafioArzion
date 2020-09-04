import {Controller, Get,Post,Put, Delete, Param,Body, Req, Inject, UseGuards, Query, HttpCode} from '@nestjs/common';
import {ApiTags, ApiResponse, ApiForbiddenResponse} from '@nestjs/swagger';
import { Request } from 'express';
import { ApiImplicitQueries } from 'nestjs-swagger-api-implicit-queries-decorator';
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
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'Create a new Minimart',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async addMinimart(@Body() minimartDTO:MinimartDTO){
    try{
      const minimart = await this.minimartService.save(minimartDTO);
      return{
        success: true,
        data: {minimart},
        errors: [],
        warninigs: []
      };
    }catch(error){
      return{
        success: false,
        data: {},
        errors: [error],
        warninigs: []
      };
    }
  }

  @Get()
  @ApiImplicitQueries([
    { name: 'hour', description: 'Time you want to know the availability of mini markets', required: false }
  ])
  @ApiResponse({
    status: 200,
    description: 'All minimarts or selected depending on the parameter',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async getMinimart(@Query("hour") hour:number){
    try{
      //2-Be able to query available stores at a certain time in the day and return only those that apply
      let minimarts;
      if (hour !== undefined) {
        minimarts = await this.minimartService.findByHours(hour);
      }else{
        minimarts = await this.minimartService.findAll();
      }

      return{
        success: true,
        data: {minimarts},
        errors: [],
        warninigs: []
      };
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
  @ApiResponse({
    status: 200,
    description: 'A minimart',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async getOneMinimart(@Param('id') id: number){
    try{
      const minimart = await this.minimartService.find(id);
      return{
        success: true,
        data: {minimart},
        errors: [],
        warninigs: []
      };
    }catch(error){
      return{
        success: false,
        data: {},
        errors: [error],
        warninigs: []
      };
    }
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'A update a minimart',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async updateMinimart(@Body() minimartDTO:MinimartDTO, @Param('id') id: number){
    try{
      await this.minimartService.update(id,minimartDTO);
      const minimartUpdate = await this.minimartService.find(id);
      return{
        success: true,
        data: {minimartUpdate},
        errors: [],
        warninigs: []
      };
    }catch(error){
      return{
        success: false,
        data: {},
        errors: [error],
        warninigs: []
      };
    }
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'Delete a minimart',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async deleteMinimart( @Param('id') id: number){
    try{
      await this.minimartService.delete(id);
      return{
        success: true,
        errors: [],
        warninigs: []
      };
    }catch(error){
      return{
        success: false,
        data: {},
        errors: [error],
        warninigs: []
      };
    }
  }

  //4-Be able to query if a product is available, at a certain store, and return that product's info
  @Get(":id/products/:idProduct")
  @ApiResponse({
    status: 200,
    description: 'Product for a minimart',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async getProductByIdInMinimart(@Param('id') id: number, @Param('idProduct') idProduct: number){
    try{
      const product = await this.minimartService.findProductByIdInMinimart(id, idProduct);
      return{
        success: true,
        data: {product},
        errors: [],
        warninigs: []
      };
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
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async getProductsByMinimart(@Param('id') id: number){
    try{
      const products = await this.minimartService.findProdutcsByMinimart(id);
      return{
        success: true,
        data: {products},
        errors: [],
        warninigs: []
      };
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
