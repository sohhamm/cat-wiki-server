import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Cat extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column()
  url!: string;

  @Column()
  description!: string;

  @Column()
  count!: number;
}
