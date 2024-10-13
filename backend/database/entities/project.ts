import { BaseEntity, Column, OneToMany, ManyToMany, Entity, JoinTable, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user";
import { TaskEntity } from "./task";


@Entity({ name: "projects" })
export class ProjectEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  owners: UserEntity[];

  @OneToMany(() => TaskEntity, (task) => task.id)
  tasks: TaskEntity[];

  @Column({ type: "date", nullable: false })
  dueDate: Date;

  @Column({ type: "float", nullable: false })
  progress: number;

  @Column({ type: "float", nullable: false })
  budget: number;
}
