import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../../modules/common/entity/cart';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository:Repository<Cart>
  ){}

  async save(cart:any){
    await this.cartRepository.insert(cart);
    return cart
  }

  async update(id:number,cart:any){
    await this.cartRepository.update(id,cart);
  }

  async findAll(){
    return await this.cartRepository.find();
  }

  async find(id:number){
    return await this.cartRepository.findOne(id);
  }

  async delete(id:number){
    return await this.cartRepository.delete(id);
  }
}
