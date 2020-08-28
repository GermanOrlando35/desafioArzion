import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, LessThanOrEqual} from 'typeorm';
import { Minimart } from '../../modules/common/entity/minimart';
import { MinimartproductService } from '../../services/minimartproduct/minimartproduct.service';
import { ProductService } from '../../services/product/product.service';

@Injectable()
export class MinimartService {

  constructor(
    @InjectRepository(Minimart)
    private readonly minimartRepository:Repository<Minimart>,
    @Inject(forwardRef(() => MinimartproductService))
    private readonly minimartproductService: MinimartproductService,
    private readonly productService: ProductService
  ){}

  async save(minimart:any){
    await this.minimartRepository.insert(minimart);
    return minimart
  }

  async update(id:number,minimart:any){
    await this.minimartRepository.update(id,minimart);
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
    var minimartProduct = this.minimartproductService.findByMinimartIdAndProductId(idMinimart,idProduct);
    if (minimartProduct !== undefined) {
      return this.productService.find(idProduct);
    }
  }

  async findProdutcsByMinimart(idMinimart:number){
    return await this.minimartRepository.find({
      relations: ["minimartproducts"],
      where: {
          id: idMinimart
      }
    });
  }
}
