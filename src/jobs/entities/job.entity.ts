import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { JobCategory } from "../../job_categories/entities/job_category.entity";
import { EmploymentType, ExperienceLevel } from "../../common/enums/jobs.enum";

@Entity("jobs")
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  hr_specialist_id: number;

  @Column({ type: "int" })
  company_id: number;

  @Column({ type: "int", nullable: true })
  category_id?: number;

  @Column()
  title: string;

  @Column("text")
  description: string;

  @Column("text", { nullable: true })
  requirements?: string;

  @Column("text", { nullable: true })
  responsibilities?: string;

  @Column("text", { nullable: true })
  benefits?: string;

  @Column({ type: "enum", enum: EmploymentType })
  employment_type: EmploymentType;

  @Column({ type: "enum", enum: ExperienceLevel, nullable: true })
  experience_level?: ExperienceLevel;

  @Column("decimal", { nullable: true })
  min_salary?: number;

  @Column("decimal", { nullable: true })
  max_salary?: number;

  @Column({ type: "varchar", length: 3, nullable: true })
  currency?: string;

  @Column({ nullable: true })
  location: string;

  @Column({ type: "boolean", default: false })
  is_remote: boolean;

  @Column({ type: "boolean", default: true })
  is_active: boolean;

  @Column({ type: "date", nullable: true })
  application_deadline?: Date;

  @Column({ type: "int", nullable: true })
  positions_available?: number;

  @Column({ type: "int", default: 0 })
  views_count: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => JobCategory)
  @JoinColumn({ name: "category_id" })
  category?: JobCategory;

  // @ManyToOne(() => Company)
  // @JoinColumn({ name: "company_id" })
  // company: Company;

  // @ManyToOne(() => HrSpecialist)
  // @JoinColumn({ name: "hr_specialist_id" })
  // hr_specialist: HrSpecialist;
}
