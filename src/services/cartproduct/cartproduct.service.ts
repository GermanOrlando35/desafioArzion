import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cartproduct } from '../../modules/common/entity/cartproduct';

@Injectable()
export class CartproductService {

  @InjectRepository(Cartproduct)
  private readonly cartproductRepository:Repository<Cartproduct>;

  async save(cartproduct:any){
    const insert = await this.cartproductRepository.insert(cartproduct);
    return await this.find(insert.raw.insertId);
  }

  async update(id:number,cartproduct:any){
    await this.cartproductRepository.update(id,cartproduct);
  }

  async findAll(){
    return await this.cartproductRepository.find({ relations: ["cart", "product"] });
  }

  async find(id:number){
    return await this.cartproductRepository.findOne(id, { relations: ["cart", "product"] });
  }

  async delete(id:number){
    return await this.cartproductRepository.delete(id);
  }

  async findByCartAndProduct(cartId:number, productId:number){
    return await this.cartproductRepository.createQueryBuilder("cartproduct")
    .where("cartId = :id", { id: cartId })
    .andWhere("productId = :id", { id: productId })
    .getOne();
  }
}
