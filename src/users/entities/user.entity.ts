import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { JobSeeker } from "../../job_seekers/entities/job_seeker.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  email: string;

  @Column({ type: "varchar", length: 255 })
  password_hash: string;

  @Column({ type: "enum", enum: ["user", "admin", "hr"], default: "user" })
  role: string;

  @Column({ type: "boolean", default: true })
  is_active: boolean;

  @Column({ type: "boolean", default: false })
  is_verified: boolean;

  @Column({ type: "varchar", length: 255, nullable: true })
  refresh_token: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => JobSeeker, (jobSeeker) => jobSeeker.user)
  jobSeekers: JobSeeker[];

//   @OneToMany(() => HrSpecialist, (hrSpecialist) => hrSpecialist.user)
//   hrSpecialists: HrSpecialist[];

//   @OneToMany(() => JobApplication, (jobApplication) => jobApplication.jobSeeker)
//   jobApplications: JobApplication[];
}
