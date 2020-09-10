import {Controller, Get,Post,Put,Patch, Delete, Param,Body, Req, Query, Inject, UseGuards, HttpCode} from '@nestjs/common';
import {ApiTags, ApiResponse, ApiForbiddenResponse} from '@nestjs/swagger';
import { ApiImplicitQueries } from 'nestjs-swagger-api-implicit-queries-decorator';
import { Request } from 'express';
import {AuthGuard} from '../../security/auth.guard';
import { CartService } from '../../services/cart/cart.service';
import { Cart } from '../../modules/common/entity/cart'; //the model object must be hidden
import { CartDTO } from '../../dtos/cartDTO';
import { ProductDTO } from '../../dtos/productDTO';

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
  @ApiImplicitQueries([
    { name: 'codeVoucher', description: 'voucher code to validate before a cart', required: false }
  ])
  @ApiResponse({
    status: 200,
    description: 'A cart',
  })
  @ApiResponse({
    status: 409,
    description: 'The voucher does not apply to the cart',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async getOneCart(@Param('id') id: number, @Query("codeVoucher") codeVoucher:string){
    try{
      let cart;
      if (codeVoucher !== undefined) {
        cart = await this.cartService.validateVoucher(id,codeVoucher);
      }else{
        cart = await this.cartService.find(id);
      }
      return{
        success: true,
        data: {cart},
        errors: [],
        warninigs: []
      };
    }catch(error){
      const {status} = error;
      if (status === 409) {
        error.message = "The voucher does not apply to the cart";
      }
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

  @Post(':id/products')
  @ApiResponse({
    status: 201,
    description: 'A product is added from the cart',
  })
  @ApiResponse({
    status: 409,
    description: 'The product is out of stock',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async addProduct(@Body() productDTO:ProductDTO, @Param('id') id: number){
    try{
      const productAdd = await this.cartService.addProduct(id, productDTO);
      return{
        success: true,
        data: {productAdd},
        errors: [],
        warninigs: []
      };
    }catch(error){
      const {status} = error;
      if (status === 409) {
        error.message = "The product is out of stock";
      }

      return{
        success: false,
        data: {},
        errors: [error],
        warninigs: []
      };
    }
  }

}
