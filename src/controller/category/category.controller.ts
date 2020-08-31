import {Controller, Get,Post,Put, Delete, Param,Body,Inject, UseGuards} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {AuthGuard} from '../../security/auth.guard';
import { CategoryService } from '../../services/category/category.service';
import { CategoryDTO } from '../../dtos/categoryDTO';

@Controller('categorys')
@ApiTags('category')
@UseGuards(AuthGuard)
export class CategoryController {

    @Inject()
    private readonly categoryService:CategoryService;

    @Post()
    addCategory(@Body() categoryDTO:CategoryDTO):any{
      return this.categoryService.save(categoryDTO);
    }

    @Get()
    getCategory():any{
      return  this.categoryService.findAll();
    }

    @Get(':id')
    getOneCategory(@Param() params):any{
      return this.categoryService.find(params.id);
    }

    @Put(':id')
    updateCategory(@Body() categoryDTO:CategoryDTO,@Param() params):any{
      return   this.categoryService.update(params.id,categoryDTO);
    }

    @Delete(':id')
    deleteCategory( @Param() params):any{
      return  this.categoryService.delete(params.id);
    }
}
