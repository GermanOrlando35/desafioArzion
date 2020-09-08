import { Entity, Column, PrimaryGeneratedColumn, ChildEntity } from 'typeorm';
import { Voucher } from '../entity/voucher';

@ChildEntity()
export class Byunits extends Voucher{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pay: number;

  @Column()
  make: number;

  @Column()
  maximumQuantity: number;
}
