import { Entity, Column, TableInheritance, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import { Product } from '../entity/product';
import { Minimart } from '../entity/minimart';

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Voucher {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  validityPeriodFrom: Date;

  @Column()
  validityPeriodUntil: Date;

  @ManyToMany(type => Product)
  @JoinTable({
    name: "products_voucher",
    joinColumn: {
      name: "product",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "voucher",
      referencedColumnName: "id"
    }
  })
  products: Product[];

  @ManyToOne(type => Minimart, minimart => minimart.vouchers)
  minimart: Minimart;

}
