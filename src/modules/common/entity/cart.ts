import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from '../entity/product';
import { Cartproduct } from '../entity/cartproduct';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateArmed: Date;

  @OneToMany(type => Cartproduct, cartproduct => cartproduct.cart)
  cartproducts: Cartproduct[];
}
