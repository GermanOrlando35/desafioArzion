import { Entity, Column, PrimaryGeneratedColumn, ChildEntity } from 'typeorm';
import { Bypercentage } from '../entity/bypercentage';

enum Days {
  "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"
}

@ChildEntity()
export class Perday extends Bypercentage{

  @PrimaryGeneratedColumn()
  id: number;

  @Column(
    {
      type: "enum",
      enum: Days
    }
  )
  days: string;
}
