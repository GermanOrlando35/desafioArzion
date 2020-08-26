import {Controller,Get,Post,Put, Delete, Param,Body} from '@nestjs/common';
import { CartService } from '../../services/cart/cart.service';
import { Cart } from '../../modules/common/entity/cart'; //the model object must be hidden

@Controller('cart')
export class CartController {

  constructor(private  cartService:CartService){
  }

  @Post()
  addCart(@Body() cart:Cart):any{
    return this.cartService.save(cart);
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
  updateCart(@Body() cart:Cart,@Param() params):any{
    return   this.cartService.update(params.id,cart);
  }

  @Delete(':id')
  deleteCart( @Param() params):any{
    return  this.cartService.delete(params.id);
  }
}
