import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, LessThanOrEqual} from 'typeorm';
import { Minimart } from '../../modules/common/entity/minimart';
import { MinimartproductService } from '../../services/minimartproduct/minimartproduct.service';
import { ProductService } from '../../services/product/product.service';

@Injectable()
export class MinimartService {

  @InjectRepository(Minimart)
  private readonly minimartRepository:Repository<Minimart>;

  @Inject(forwardRef(() => MinimartproductService))
  private readonly minimartproductService: MinimartproductService;

  @Inject()
  private readonly productService: ProductService;


  async save(minimart:any){
    const insert = await this.minimartRepository.insert(minimart);
    return await this.find(insert.raw.insertId);
  }

  async update(id:number,minimart:any){
    return await this.minimartRepository.update(id,minimart);
  }

  async findAll(){
    return await this.minimartRepository.find();
  }

  async find(id:number){
    return await this.minimartRepository.findOne(id);
  }

  async delete(id:number){
    return await this.minimartRepository.delete(id);
  }

  async findByHours(hour:any){
    return await this.minimartRepository.find(
      {
        openingTime: LessThanOrEqual(hour),
        closingTime: MoreThanOrEqual(hour)
      }
    );
  }

  async findProductByIdInMinimart(idMinimart:number,idProduct:number){
    const minimartProduct = await this.minimartproductService.findByMinimartIdAndProductId(idMinimart,idProduct);
    if (minimartProduct !== undefined) {
      return await this.productService.find(idProduct);
    }
  }

  async findProdutcsByMinimart(idMinimart:number){
    const minimarts = await this.minimartRepository.find({
      relations: ["minimartproducts"],
      where: {
          id: idMinimart
      }
    });

    let products = [];

    const minimartProducts = minimarts[0].minimartproducts;
    for (let i = 0; i < minimartProducts.length; i++) {
      const minimartProduct = await this.minimartproductService.find(minimartProducts[i].minimartproduct_id);
      products.push(minimartProduct);
    }

    return products;
  }
}
