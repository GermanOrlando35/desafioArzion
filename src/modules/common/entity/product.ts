import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToOne, JoinTable, JoinColumn } from 'typeorm';
import { Minimart } from '../entity/minimart';
import { Category } from '../entity/category';
import { Minimartproduct } from '../entity/minimartproduct';
import { Cartproduct } from '../entity/cartproduct';

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  pricing: number;

  @Column()
  description: string;

  @ManyToOne(type => Category)
  @JoinColumn()
  category: Category;

/*  @ManyToMany(type => Minimart)
  @JoinTable({
    name: "products_minimarts",
    joinColumn: {
        name: "product",
        referencedColumnName: "id"
    },
    inverseJoinColumn: {
        name: "minimart",
        referencedColumnName: "id"
    }
  })
  minimarts: Minimart[];
  */

  @OneToMany(type => Minimartproduct, minimartproduct => minimartproduct.product)
  minimartproducts: Minimartproduct[];

  @OneToMany(type => Cartproduct, cartproduct => cartproduct.product)
  cartproducts: Cartproduct[];
}
