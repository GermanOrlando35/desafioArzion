import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cartproduct } from '../../modules/common/entity/cartproduct';

@Injectable()
export class CartproductService {
  constructor(
    @InjectRepository(Cartproduct)
    private readonly cartproductRepository:Repository<Cartproduct>
  ){}

  async save(cartproduct:any){
    await this.cartproductRepository.insert(cartproduct);
    return cartproduct
  }

  async update(id:number,cartproduct:any){
    await this.cartproductRepository.update(id,cartproduct);
  }

  async findAll(){
    return await this.cartproductRepository.find();
  }

  async find(id:number){
    return await this.cartproductRepository.findOne(id);
  }

  async delete(id:number){
    return await this.cartproductRepository.delete(id);
  }
}
