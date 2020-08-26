import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../modules/common/entity/product';

@Injectable()
export class ProductService {

    constructor(
      @InjectRepository(Product)
      private readonly productRepository:Repository<Product>
    ){}

    async save(product:any){
      await this.productRepository.insert(product);
      return product
    }

    async update(id:number,product:any){
      await this.productRepository.update(id,product);
    }

    async findAll(){
      return await this.productRepository.find({ relations: ["category"] });
    }

    async find(id:number){
      return await this.productRepository.findOne(id);
    }

    async delete(id:number){
      return await this.productRepository.delete(id);
    }
}
