import { Entity, Column, PrimaryGeneratedColumn, ChildEntity } from 'typeorm';
import { Bypercentage } from '../entity/bypercentage';

@ChildEntity()
export class Bynumberofunits extends Bypercentage{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  discountedUnit: number;

}
