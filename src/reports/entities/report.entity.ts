import { User } from "src/users/entities/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from "typeorm";

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  approved: boolean

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  long: number;

  @Column()
  lat: number;

  @Column()
  milage: number;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
