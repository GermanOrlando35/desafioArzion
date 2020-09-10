import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Voucher } from '../../modules/common/entity/voucher';
import { Perday } from '../../modules/common/entity/perday';



@Injectable()
export class VoucherService {

  @InjectRepository(Voucher)
  private readonly voucherRepository:Repository<Voucher>;

  @InjectRepository(Perday)
  private readonly perdayRepository:Repository<Perday>;

  async save(voucher:any){
    const insert = await this.voucherRepository.insert(voucher);
    return await this.find(insert.raw.insertId);
  }

  async update(id:number,voucher:any){
    await this.voucherRepository.update(id,voucher);
  }

  async findAll(){
    return await this.voucherRepository.find();
  }

  async find(id:number){
    return await this.voucherRepository.findOne(id);
  }

  async delete(id:number){
    return await this.voucherRepository.delete(id);
  }

  async findByCode(voucherCode: string){
    //You need to do the findOne without knowing what class of the hierarchy it is
    return await this.perdayRepository.findOne({
      where: {
          code: voucherCode
      },
      relations: ["minimart", "products"]
    });
  }

}
