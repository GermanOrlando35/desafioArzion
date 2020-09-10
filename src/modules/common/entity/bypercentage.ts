import { Entity, Column, PrimaryGeneratedColumn, ChildEntity } from 'typeorm';
import { Voucher } from '../entity/voucher';

@ChildEntity()
export class Bypercentage extends Voucher{

  @Column()
  discountRate: number;

  hasDiscounts(product: any, cart:any):number{
    const products = this.products;
    for (let p = 0; p < products.length; p++) {
      if (products[p].id === product.id) {
         const priceByUnit = product.pricing - (this.discountRate * product.pricing)/100;
         return priceByUnit * product.quantity;
      }
    }
    return product.pricing * product.quantity;
  }
}
