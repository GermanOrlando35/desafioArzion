import { Entity, Column, PrimaryGeneratedColumn, ChildEntity } from 'typeorm';
import { Voucher } from '../entity/voucher';

@ChildEntity()
export class Byunits extends Voucher{

  @Column()
  pay: number;

  @Column()
  make: number;

  @Column()
  maximumQuantity: number;

  hasDiscounts(product: any, cart:any):number{
    const products = this.products;
    for (let p = 0; p < products.length; p++) {
      if (products[p].id === product.id) {
        let total = 0;
        let q = product.quantity;
        let cant = 0;
        while (q >= this.make && cant < this.maximumQuantity) {
          total = total + (product.pricing * this.pay);
          q = q - this.make;
          cant = cant + this.make;
        }
        return total + (product.pricing * q);
      }
    }
    return product.pricing * product.quantity;
  }
}
