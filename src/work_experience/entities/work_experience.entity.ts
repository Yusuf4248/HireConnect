import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { JobSeeker } from "../../job_seekers/entities/job_seeker.entity";

@Entity("work_experience")
export class WorkExperience {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  job_seeker_id: number;

  @Column({ type: "varchar", length: 255 })
  company_name: string;

  @Column({ type: "varchar", length: 100 })
  position: string;

  @Column({
    type: "enum",
    enum: ["full-time", "part-time", "contract", "internship", "freelance"],
  })
  employment_type: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  location: string;

  @Column({ type: "date" })
  start_date: Date;

  @Column({ type: "date", nullable: true })
  end_date: Date;

  @Column({ type: "boolean", default: false })
  is_current: boolean;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "text", nullable: true })
  achievements: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => JobSeeker, (jobSeeker) => jobSeeker.workExperiences)
  @JoinColumn({ name: "job_seeker_id" })
  jobSeeker: JobSeeker;
}
