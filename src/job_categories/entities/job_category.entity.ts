import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";

@Entity("job_categories")
export class JobCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ nullable: true })
  parent_id?: number;

  @ManyToOne(() => JobCategory, (category) => category.children, {
    onDelete: "SET NULL",
    nullable: true,
  })
  
  @JoinColumn({ name: "parent_id" })
  parent?: JobCategory;

  @OneToMany(() => JobCategory, (category) => category.parent)
  children: JobCategory[];

  @Column({ type: "boolean", default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;
}
