import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity("hr_specialists")
export class HrSpecialist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  company_id: number;

  @Column({ type: "varchar", length: 100 })
  first_name: string;

  @Column({ type: "varchar", length: 100 })
  last_name: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  position: string;

  @Column({ type: "varchar", length: 15, nullable: true })
  phone: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  department: string;

  @Column({ type: "boolean", default: false })
  is_company_admin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.hrSpecialists)
  @JoinColumn({ name: "user_id" })
  user: User;

//   @ManyToOne(() => Company, (company) => company.hrSpecialists)
//   @JoinColumn({ name: "company_id" })
//   company: Company;

//   @OneToMany(() => Job, (job) => job.hrSpecialist)
//   jobs: Job[];
}
