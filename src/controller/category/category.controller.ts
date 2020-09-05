import {Controller, Get,Post,Put, Delete, Param,Body,Inject, UseGuards, HttpCode} from '@nestjs/common';
import {ApiTags, ApiResponse, ApiForbiddenResponse} from '@nestjs/swagger';
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
    @HttpCode(201)
    @ApiResponse({
      status: 201,
      description: 'Create a new category',
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async addCategory(@Body() categoryDTO:CategoryDTO){
      try{
        const category = await this.categoryService.save(categoryDTO);
        return{
          success: true,
          data: {category},
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
      description: 'All available categories',
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async getCategory(){
      try {
        const categories = await this.categoryService.findAll();
        return {
            success: true,
            data: {categories},
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
      description: 'A category',
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async getOneCategory(@Param('id') id: number){
      try{
        const category = await this.categoryService.find(id);
        return{
          success: true,
          data: {category},
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
      description: 'A update a category',
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async updateCategory(@Body() categoryDTO:CategoryDTO,@Param('id') id: number){
      try{
        const categoryUpdate = await this.categoryService.update(id,categoryDTO);
        return{
          success: true,
          data: {categoryUpdate},
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
      description: 'Delete a category',
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async deleteCategory( @Param('id') id: number){
      try{
        await this.categoryService.delete(id);
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
