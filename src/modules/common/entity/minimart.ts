import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Product } from '../entity/product';

@Entity()
export class Minimart {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  workDays: string;

  @Column()
  hours: number;

  @Column()
  address: string;

  @Column()
  logo: string;

  @ManyToMany(type => Product)
  products: Product[];
}
