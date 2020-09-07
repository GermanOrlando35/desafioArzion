import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../modules/common/entity/category';
import { CategoryDTO } from '../../dtos/categoryDTO';

@Injectable()
export class CategoryService {

    @InjectRepository(Category)
    private readonly categoryRepository:Repository<Category>;

    async save(category:any){
      const insert = await this.categoryRepository.insert(category);
      const categoryInsert: Category = await this.find(insert.raw.insertId);
      const categoryDTO: CategoryDTO = new CategoryDTO(categoryInsert);
      return categoryDTO;
    }

    async update(id:number,category:any){
      const result = await this.categoryRepository.update(id,category);
      const categoryUpdate: Category = await this.find(id);
      const categoryDTO: CategoryDTO = new CategoryDTO(categoryUpdate);
      return categoryDTO;
    }

    async findAll(){
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
      throw new NotFoundException();
    }

    async delete(id:number){
      return await this.categoryRepository.delete(id);
    }
}
