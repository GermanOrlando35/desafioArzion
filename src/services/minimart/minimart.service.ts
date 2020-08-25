import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Minimart } from '../../modules/common/entity/minimart';

@Injectable()
export class MinimartService {

  constructor(
    @InjectRepository(Minimart)
    private readonly minimartRepository:Repository<Minimart>
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
}
