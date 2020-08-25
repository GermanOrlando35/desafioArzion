import {Controller,Get,Post,Put, Delete, Param,Body} from '@nestjs/common';
import { CategoryService } from '../../services/category/category.service';
//import { Category } from '../../interfaces/category.interface';
import { Category } from '../../modules/common/entity/category'; //the model object must be hidden

@Controller('category')
export class CategoryController {

    constructor(private  categoryService:CategoryService){
    }

    @Post()
    addProdut(@Body() category:Category):any{
      return this.categoryService.save(category);
    }

    @Get()
    getProduct():any{
      return  this.categoryService.findAll();
    }

    @Get(':id')
    getOneProduct(@Param() params):any{
      return this.categoryService.find(params.id);
    }

    @Put(':id')
    updateProduct(@Body() category:Category,@Param() params):any{
      return   this.categoryService.update(params.id,category);
    }

    @Delete(':id')
    deleteProducto( @Param() params):any{
      return  this.categoryService.delete(params.id);
    }
}
