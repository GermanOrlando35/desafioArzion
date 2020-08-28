import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Minimartproduct } from '../../modules/common/entity/minimartproduct';
import { MinimartService } from '../../services/minimart/minimart.service';
import { ProductService } from '../../services/product/product.service';

@Injectable()
export class MinimartproductService {

  constructor(
    @InjectRepository(Minimartproduct)
    private readonly minimartproductRepository:Repository<Minimartproduct>,
    @Inject(forwardRef(() => MinimartService))
    private readonly minimartService: MinimartService,
    private readonly productService: ProductService
  ){}

  getMinimartById(minimartId):any{
    return this.minimartService.find(minimartId);
  }

  getProductById(productId):any{
    return this.productService.find(productId);
  }

  async save(minimartproduct:any){
    await this.minimartproductRepository.insert(minimartproduct);
    return minimartproduct
  }

  async update(id:number,minimartproduct:any){
    await this.minimartproductRepository.update(id,minimartproduct);
  }

  async findAll(){
    return await this.minimartproductRepository.find();
  }

  async find(id:number){
    return await this.minimartproductRepository.findOne(id);
  }

  async delete(id:number){
    return await this.minimartproductRepository.delete(id);
  }

  async findByMinimartIdAndProductId(idMinimart:number,idProduct:number){
    return await this.minimartproductRepository.find({
      minimart: this.getMinimartById(idMinimart),
      product: this.getProductById(idProduct)
    });
  }

}
