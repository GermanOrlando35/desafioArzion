import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToMany, JoinTable } from 'typeorm';
import { Minimart } from '../entity/minimart';
import { Category } from '../entity/category';

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

  @OneToOne(type => Category)
  category: Category[];

  @ManyToMany(type => Minimart)
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
}
