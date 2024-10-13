import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { UserEntity } from "./user";
import { PaymentEntity } from "./payment";


@Entity({ name: "personal_payments" })
export class PersonalPaymentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.payments)
  from: UserEntity;

  @ManyToOne(() => UserEntity)
  to: UserEntity;

  @ManyToOne(() => PaymentEntity)
  payment: PaymentEntity;

  @Column({ type: "text", nullable: true })
  walletAddress?: string;

  @Column({ type: "date", nullable: false })
  dueDate: Date;
}
