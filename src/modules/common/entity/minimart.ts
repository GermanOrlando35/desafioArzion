import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from '../entity/product';
import { Minimartproduct } from '../entity/minimartproduct';

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

  /*@ManyToMany(type => Product)
  products: Product[];*/

  @OneToMany(type => Minimartproduct, minimartproduct => minimartproduct.minimart)
  minimartproducts: Minimartproduct[];
}
