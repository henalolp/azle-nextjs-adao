import { BaseEntity, Column, OneToMany, ManyToOne, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column({ type: "enum", enum: ['friend', 'member', 'admin'], default: 'member' })
  type: 'friend' | 'member' | 'admin';

  @Column({ type: "text", nullable: false })
  name: string;

  @Column({ type: "text", nullable: false, unique: true })
  email: string;

  @OneToMany(() => PaymentEntity, (payment) => payment.user)
  payments: PaymentEntity[];

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];

  @OneToMany(() => ProjectEntity, (project) => project.user)
  projects: ProjectEntity[];

  @OneToMany(() => EventEntity, (event) => event.user)
  events: EventEntity[];
}

@Entity({ name: "payments" })
export class PaymentEntity extends BaseEntity {
  // Define payment columns here
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.payments)
  user: UserEntity;
}

@Entity({ name: "tasks" })
export class TaskEntity extends BaseEntity {
  // Define task columns here
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  user: UserEntity;
}

@Entity({ name: "projects" })
export class ProjectEntity extends BaseEntity {
  // Define project columns here
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.projects)
  user: UserEntity;
}

@Entity({ name: "events" })
export class EventEntity extends BaseEntity {
  // Define event columns here
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.events)
  user: UserEntity;
}