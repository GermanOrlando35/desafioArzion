import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from '../entity/product';
import { Minimart } from '../entity/minimart';

@Entity()
export class Minimartproduct {

  @PrimaryGeneratedColumn()
  minimartproduct_id: number;

  @Column()
  stock: number;

  @ManyToOne(type => Minimart, minimart => minimart.minimartproducts)
  minimart: Minimart;

  @ManyToOne(type => Product, product => product.minimartproducts)
  product: Product;
}
