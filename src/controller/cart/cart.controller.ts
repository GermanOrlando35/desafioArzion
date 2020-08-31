import {Controller, Get,Post,Put,Patch, Delete, Param,Body, Req, Inject, UseGuards} from '@nestjs/common';
import {ApiTags, ApiResponse} from '@nestjs/swagger';
import { Request } from 'express';
import {AuthGuard} from '../../security/auth.guard';
import { CartService } from '../../services/cart/cart.service';
import { Cart } from '../../modules/common/entity/cart'; //the model object must be hidden
import { CartDTO } from '../../dtos/cartDTO';

@Controller('carts')
@ApiTags('cart')
@UseGuards(AuthGuard)
export class CartController {

  @Inject()
  private readonly cartService:CartService;

  @Post()
  addCart(@Body() cartDTO:CartDTO):any{
    return this.cartService.save(cartDTO);
  }

  @Get()
  getCart():any{
    return  this.cartService.findAll();
  }

  @Get(':id')
  getOneCart(@Param() params):any{
    return this.cartService.find(params.id);
  }

  @Put(':id')
  updateCart(@Body() cartDTO:CartDTO,@Param() params):any{
    return   this.cartService.update(params.id,cartDTO);
  }

  @Delete(':id')
  deleteCart( @Param() params):any{
    return  this.cartService.delete(params.id);
  }

  @Delete(':id/products/:idProduct')
  @ApiResponse({
    status: 200,
    description: 'A product is removed',
  })
  removeProduct(@Param() params):any{
    try{
      return this.cartService.deleteProduct(params.id, params.idProduct);
    }catch(error){
      return{
        success: false,
        data: {},
        errors: [error],
        warninigs: []
      }
    }
  }

  @Patch(':id/products/:idProduct')
  @ApiResponse({
    status: 200,
    description: 'resource updated successfully',
  })
  addProduct(@Body() cartDTO:CartDTO, @Param() params):any{
    try{
      return this.cartService.addProduct(params.id, params.idProduct, cartDTO);
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
