import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../modules/common/entity/product';

@Injectable()
export class ProductService {

    @InjectRepository(Product)
    private readonly productRepository:Repository<Product>;

    async save(product:any){
      const insert = await this.productRepository.insert(product);
      return await this.find(insert.raw.insertId);
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

    async findProductsStockTotal(){
      return await this.productRepository.createQueryBuilder("product")
      .select("product")
      .addSelect("SUM(minimartproduct.stock)", "stock")
      .innerJoin("product.minimartproducts", "minimartproduct", "minimartproduct.productId = product.id")
      .groupBy("minimartproduct.productId")
      .getRawMany();
    }
}
