import {Controller,Get,Post,Put, Delete, Param,Body} from '@nestjs/common';
import { ProductService } from '../../services/product/product.service';
//import { Product } from '../../interfaces/product.interface';
import { Product } from '../../modules/common/entity/product'; //the model object must be hidden

@Controller('product')
export class ProductController {

    constructor(private  productService:ProductService){
    }

    @Post()
    addProdut(@Body() product:Product):any{
      return this.productService.save(product);
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
    updateProduct(@Body() product:Product,@Param() params):any{
      return   this.productService.update(params.id,product);
    }

    @Delete(':id')
    deleteProduct( @Param() params):any{
      return  this.productService.delete(params.id);
    }
}
