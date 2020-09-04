import {Controller, Get,Post,Put, Delete, Param,Body, Inject, UseGuards, HttpCode} from '@nestjs/common';
import {ApiTags, ApiResponse, ApiForbiddenResponse} from '@nestjs/swagger';
import {AuthGuard} from '../../security/auth.guard';
import { ProductService } from '../../services/product/product.service';
import { ProductDTO } from '../../dtos/productDTO';

@Controller('products')
@ApiTags('product')
@UseGuards(AuthGuard)
export class ProductController {

    @Inject()
    private readonly productService:ProductService;

    @Post()
    @HttpCode(201)
    @ApiResponse({
      status: 201,
      description: 'Create a new Product',
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async addProdut(@Body() productDTO:ProductDTO){
      try{
        const product = await this.productService.save(productDTO);
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

    //3-Be able to query all available products, across stores, with their total stock.
    @Get('allProductsWithTotalStock')
    @ApiResponse({
      status: 200,
      description: 'All available products, across stores, with their total stock.',
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async getProductsStockTotal(){
      try{
        const products = await this.productService.findProductsStockTotal();
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

    @Get()
    @ApiResponse({
      status: 200,
      description: 'All available products',
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async getProducts(){
      try {
        const products = await this.productService.findAll();
        return {
            success: true,
            data: {products},
            errors: [],
            warnings: [],
        };
      } catch (error) {
          return {
            success: false,
            data: {},
            errors: [error],
            warnings: [],
          };
      }
    }

    @Get(':id')
    @ApiResponse({
      status: 200,
      description: 'A product',
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async getOneProduct(@Param('id') id: number){
      try{
        const product = await this.productService.find(id);
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

    @Put(':id')
    @ApiResponse({
      status: 200,
      description: 'A update a product',
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async updateProduct(@Body() productDTO:ProductDTO,@Param('id') id: number){
      try{
        await this.productService.update(id,productDTO);
        const productUpdate = await this.productService.find(id);
        return{
          success: true,
          data: {productUpdate},
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
      description: 'Delete a product',
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async deleteProduct( @Param('id') id: number){
      try{
        await this.productService.delete(id);
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

}
