import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Minimartproduct } from '../../modules/common/entity/minimartproduct';
import { MinimartService } from '../../services/minimart/minimart.service';
import { ProductService } from '../../services/product/product.service';

@Injectable()
export class MinimartproductService {

  @InjectRepository(Minimartproduct)
  private readonly minimartproductRepository:Repository<Minimartproduct>;

  @Inject(forwardRef(() => MinimartService))
  private readonly minimartService: MinimartService;

  @Inject()
  private readonly productService: ProductService;

  getMinimartById(minimartId):any{
    return this.minimartService.find(minimartId);
  }

  getProductById(productId):any{
    return this.productService.find(productId);
  }

  async save(minimartproduct:any){
    const insert = await this.minimartproductRepository.insert(minimartproduct);
    return await this.find(insert.raw.insertId);
  }

  async update(id:number,minimartproduct:any){
    await this.minimartproductRepository.update(id,minimartproduct);
  }

  async findAll(){
    return await this.minimartproductRepository.find();
  }

  async find(id:number){
    return await this.minimartproductRepository.findOne(id, { relations: ["product"] });
  }

  async delete(id:number){
    return await this.minimartproductRepository.delete(id);
  }

  async findByMinimartIdAndProductId(idMinimart:number,idProduct:number){
    return await this.minimartproductRepository.find({
      minimart: await this.getMinimartById(idMinimart),
      product: await this.getProductById(idProduct)
    });
  }

  async productHasStockForMinimart(idMinimart:number,idProduct:number){
    return await this.minimartproductRepository.createQueryBuilder("minimartproduct")
    .where("minimartId = :id", { id: idMinimart })
    .andWhere("productId = :id", { id: idProduct })
    .getOne();
  }

}
