import { Entity, Column, PrimaryGeneratedColumn, ChildEntity } from 'typeorm';
import { Bypercentage } from '../entity/bypercentage';

enum Days {
  Lunes = "Lunes",
  Martes = "Martes",
  Miercoles = "Miercoles",
  Jueves = "Jueves",
  Viernes = "Viernes",
  Sabado = "Sabado",
  Domingo ="Domingo"
}

const weekday = new Array(7);
weekday[0] = "Domingo";
weekday[1] = "Lunes";
weekday[2] = "Martes";
weekday[3] = "Miercoles";
weekday[4] = "Jueves";
weekday[5] = "Viernes";
weekday[6] = "Sabado";

@ChildEntity()
export class Perday extends Bypercentage{

  @Column(
    {
      type: "enum",
      enum: Days
    }
  )
  days: Days[];

  hasDiscounts(product: any, cart:any):number{
    const cartDay = weekday[cart.dateArmed.getDay()];
    for (let d = 0; d < this.days.length; d++) { //I did it with a for, but I'm not sure it's the correct way
      if (this.days[d] === cartDay) {
        const products = this.products;
        for (let p = 0; p < products.length; p++) {
          if (products[p].id === product.id) {
             const priceByUnit = product.pricing - (this.discountRate * product.pricing)/100;
             return priceByUnit * product.quantity;
          }
        }
      }
    }
    return product.pricing * product.quantity;
  }


}
