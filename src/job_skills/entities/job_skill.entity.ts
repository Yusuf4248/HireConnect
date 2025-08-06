import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from "typeorm";
import { SkillLevel } from "../../common/enums/job_skills.enum";

@Entity("job_skills")
@Index(["job_id", "skill_id"], { unique: true })
export class JobSkill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  job_id: number;

  @Column()
  skill_id: number;

  @Column({ type: "boolean", nullable: true })
  is_required?: boolean;

  @Column({
    type: "enum",
    enum: SkillLevel,
    nullable: true,
  })
  minimum_level?: SkillLevel;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  // @ManyToOne(() => JobSeeker)
  // @JoinColumn({ name: "jobSeekerId" })
  // jobSeeker: JobSeeker;

  // @ManyToOne(() => Skill)
  // @JoinColumn({ name: "skillId" })
  // skill: Skill;
}
