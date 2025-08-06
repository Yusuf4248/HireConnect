import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Unique,
} from "typeorm";
import { ProficiencyLevel } from "../../common/enums/job_seeker_skills.enum";



@Entity("job_seeker_skills")
@Unique(["jobSeekerId", "skillId"])
export class JobSeekerSkill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  jobSeekerId: number;

  @Column()
  skillId: number;

  @Column({
    type: "enum",
    enum: ProficiencyLevel,
    nullable: true,
  })
  proficiencyLevel?: ProficiencyLevel;

  @Column({ type: "int", nullable: true })
  yearsOfExperience?: number;

  @CreateDateColumn({ type: "timestamp", nullable: true })
  createdAt?: Date;

  // @ManyToOne(() => JobSeeker)
  // @JoinColumn({ name: "jobSeekerId" })
  // jobSeeker: JobSeeker;

  // @ManyToOne(() => Skill)
  // @JoinColumn({ name: "skillId" })
  // skill: Skill;
}
