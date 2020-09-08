import { Entity, Column, PrimaryGeneratedColumn, ChildEntity } from 'typeorm';
import { Voucher } from '../entity/voucher';

@ChildEntity()
export class Bypercentage extends Voucher{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  discountRate: number;
}
