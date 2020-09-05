import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../modules/common/entity/category';
import { CategoryDTO } from '../../dtos/categoryDTO';

@Injectable()
export class CategoryService {

    @InjectRepository(Category)
    private readonly categoryRepository:Repository<Category>;

    async save(category:any){
      await this.categoryRepository.insert(category);
      const categoryDTO: CategoryDTO = new CategoryDTO(category);
      return categoryDTO;
    }

    async update(id:number,category:any){
      await this.categoryRepository.update(id,category);
      const categoryUpdate: Category = await this.find(id);
      if (categoryUpdate) {
        const categoryDTO: CategoryDTO = new CategoryDTO(categoryUpdate);
        return categoryDTO;
      }
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    async findAll(){
      return await this.categoryRepository.find();
      const categories: Category[] = await this.categoryRepository.find();
      let categoriesDTO: CategoryDTO[] = [];
      for (let i = 0; i < categories.length; i++) {
        const categoryDTO: CategoryDTO = new CategoryDTO(categories[i]);
        categoriesDTO.push(categoryDTO);
      }
      return categoriesDTO;
    }

    async find(id:number){
      const category: Category = await this.categoryRepository.findOne(id);
      if (category) {
        const categoryDTO: CategoryDTO = new CategoryDTO(category);
        return categoryDTO;
      }
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    async delete(id:number){
      return await this.categoryRepository.delete(id);
    }
}
