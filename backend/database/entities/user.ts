import { BaseEntity, Column, OneToMany, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskEntity } from "./task";
import { ProjectEntity } from "./project";
import { PersonalPaymentEntity } from "./personal_payment";
import { EventEntity } from "./event";


@Entity({
  name: "users",
})
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: false, unique: true, readonly: true })
  principal: string;

  @Column({ type: "text", nullable: false, unique: true })
  username: string;

  @Column({ type: "text", nullable: false, unique: true })
  bio: string;

  @Column({ type: "enum", enum: ["friend", "member", "admin"], default: "member" })
  type: "friend" | "member" | "admin";

  @Column({ type: "text", nullable: false })
  name: string;

  @Column({ type: "text", nullable: false, unique: true })
  email: string;

  @OneToMany(() => PersonalPaymentEntity, (personalPayment) => personalPayment.from)
  payments: PersonalPaymentEntity[];

  @OneToMany(() => TaskEntity, (task) => task.owner)
  tasks: TaskEntity[];

  @OneToMany(() => ProjectEntity, (project) => project.owners)
  projects: ProjectEntity[];

  @OneToMany(() => EventEntity, (event) => event.organizer)
  events: EventEntity[];
}
