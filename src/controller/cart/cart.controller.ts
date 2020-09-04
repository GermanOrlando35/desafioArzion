import {Controller, Get,Post,Put,Patch, Delete, Param,Body, Req, Inject, UseGuards, HttpCode} from '@nestjs/common';
import {ApiTags, ApiResponse, ApiForbiddenResponse} from '@nestjs/swagger';
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
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'Create a new cart',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async addCart(@Body() cartDTO:CartDTO){
    return this.cartService.save(cartDTO);
    try{
      const minimart = await this.cartService.save(cartDTO);
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
  @ApiResponse({
    status: 200,
    description: 'All available carts',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async getCart(){
    return  this.cartService.findAll();
    try{
      const carts = await this.cartService.findAll();
      return{
        success: true,
        data: {carts},
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
    description: 'A cart',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async getOneCart(@Param('id') id: number){
    try{
      const cart = await this.cartService.find(id);
      return{
        success: true,
        data: {cart},
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
    description: 'A update a cart',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async updateCart(@Body() cartDTO:CartDTO,@Param('id') id: number){
    try{
      await this.cartService.update(id,cartDTO);
      const cartUpdate = await this.cartService.find(id);
      return{
        success: true,
        data: {cartUpdate},
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
    description: 'Delete a cart',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async deleteCart(@Param('id') id: number){
    try{
      await this.cartService.delete(id);
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

  @Delete(':id/products/:idProduct')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'A product is removed from the cart',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async removeProduct(@Param('id') id: number, @Param('idProduct') idProduct: number){
    try{
      await this.cartService.deleteProduct(id, idProduct);
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
      }
    }
  }

  @Patch(':id/products/:idProduct')
  @ApiResponse({
    status: 200,
    description: 'A product is added from the cart',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async addProduct(@Body() cartDTO:CartDTO, @Param('id') id: number, @Param('idProduct') idProduct: number){
    try{
      const productAdd = await this.cartService.addProduct(id, idProduct, cartDTO);
      return{
        success: true,
        data: {productAdd},
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
