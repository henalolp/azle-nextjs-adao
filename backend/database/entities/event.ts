import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";


import { UserEntity } from "./user";


@Entity({ name: "events" })
export class EventEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.events)
  organizer: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  suggestedby?: UserEntity;

  @Column({ type: "text", nullable: false })
  description: string;

  @Column({ type: "date", nullable: false })
  date: Date;

  @Column({ type: "float", nullable: false })
  price: number;
}