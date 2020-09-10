import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from '../entity/product';
import { Minimartproduct } from '../entity/minimartproduct';
import { Voucher } from '../entity/voucher';

enum WorkDays {
  Lunes = "Lunes",
  Martes = "Martes",
  Miercoles = "Miercoles",
  Jueves = "Jueves",
  Viernes = "Viernes",
  Sabado = "Sabado",
  Domingo ="Domingo"
}

@Entity()
export class Minimart {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column(
    {
      type: "enum",
      enum: WorkDays
    }
  )
  workDays: WorkDays;

  /*@Column("simple-json")
  hours: { start: string, end: string };*/

  @Column()
  openingTime: number

  @Column()
  closingTime: number

  @Column()
  address: string;

  @Column()
  logo: string;

  /*@ManyToMany(type => Product)
  products: Product[];*/

  @OneToMany(type => Minimartproduct, minimartproduct => minimartproduct.minimart)
  minimartproducts: Minimartproduct[];

  @OneToMany(type => Voucher, voucher => voucher.minimart)
  vouchers: Voucher[];
}
