import { Entity, Column, PrimaryGeneratedColumn, ChildEntity } from 'typeorm';
import { Bypercentage } from '../entity/bypercentage';

@ChildEntity()
export class Bynumberofunits extends Bypercentage{

  @Column()
  discountedUnit: number;

  hasDiscounts(product: any, cart:any):number{
    const products = this.products;
    for (let p = 0; p < products.length; p++) {
      if (products[p].id === product.id) {
        const discountRateOnEachUnit = this.discountRate / this.discountedUnit;
        let total = 0;
        let q = product.quantity;
        while (q >= this.discountedUnit) {
          let discount = (discountRateOnEachUnit * product.pricing)/100;
          total = total + ((product.pricing - discount) * this.discountedUnit);
          q = q - this.discountedUnit;
        }
        return total + (product.pricing * q);
      }
    }
    return product.pricing * product.quantity;
  }

}
