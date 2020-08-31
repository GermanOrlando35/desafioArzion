import {Controller, Get,Post,Put, Delete, Param,Body, Inject, UseGuards} from '@nestjs/common';
import {ApiTags, ApiResponse} from '@nestjs/swagger';
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
    addProdut(@Body() productDTO:ProductDTO):any{
      return this.productService.save(productDTO);
    }

    //3-Be able to query all available products, across stores, with their total stock.
    @Get('allProductsWithTotalStock')
    @ApiResponse({
      status: 200,
      description: 'All available products, across stores, with their total stock.',
    })
    getProductsStockTotal():any{
      try{
        return this.productService.findProductsStockTotal();
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
    getProduct():any{
      return  this.productService.findAll();
    }

    @Get(':id')
    getOneProduct(@Param() params):any{
      return this.productService.find(params.id);
    }

    @Put(':id')
    updateProduct(@Body() productDTO:ProductDTO,@Param() params):any{
      return   this.productService.update(params.id,productDTO);
    }

    @Delete(':id')
    deleteProduct( @Param() params):any{
      return  this.productService.delete(params.id);
    }

}
