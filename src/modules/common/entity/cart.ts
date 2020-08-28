import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { Minimart } from '../entity/minimart';
import { Product } from '../entity/product';
import { Cartproduct } from '../entity/cartproduct';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateArmed: Date;

  @OneToOne(type => Minimart)
  @JoinColumn()
  minimart: Minimart;

  @OneToMany(type => Cartproduct, cartproduct => cartproduct.cart)
  cartproducts: Cartproduct[];
}
