import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user";


@Entity({ name: "tasks" })
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  owner: UserEntity;

  @Column({ type: "text", nullable: false })
  description: string;

  @Column({ type: "date", nullable: false })
  dueDate: Date;
}