import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from '../entity/product';
import { Cart } from '../entity/cart';

@Entity()
export class Cartproduct {
  @PrimaryGeneratedColumn()
  cartproduct_id: number;

  @Column()
  quantity: number;

  @ManyToOne(type => Cart, cart => cart.cartproducts)
  cart: Cart;

  @ManyToOne(type => Product, product => product.cartproducts)
  product: Product;
}
