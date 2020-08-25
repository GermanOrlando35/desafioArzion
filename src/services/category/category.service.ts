import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../modules/common/entity/category';

@Injectable()
export class CategoryService {

    constructor(
      @InjectRepository(Category)
      private readonly categoryRepository:Repository<Category>
    ){}

    async save(category:any){
      await this.categoryRepository.insert(category);
      return category
    }

    async update(id:number,category:any){
      await this.categoryRepository.update(id,category);
    }

    async findAll(){
      return await this.categoryRepository.find();
    }

    async find(id:number){
      return await this.categoryRepository.findOne(id);
    }

    async delete(id:number){
      return await this.categoryRepository.delete(id);
    }
}
