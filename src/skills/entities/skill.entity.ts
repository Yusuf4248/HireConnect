import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { SkillCategoryEnums } from "../../common/enums/skill.enum";
import { JobSkill } from "../../job_skills/entities/job_skill.entity";
import { JobSeekerSkill } from "../../job_seeker_skills/entities/job_seeker_skill.entity";

@Entity('skills')
export class Skill {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the skill',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'JavaScript',
    description: 'The name of the skill. Must be unique.',
  })
  @Column({ type: 'varchar', unique: true })
  name: string;

  @ApiProperty({
    example: SkillCategoryEnums.TECHNICAL,
    description: 'Category of the skill',
  })
  @Column({ type: 'enum', enum: SkillCategoryEnums })
  category: SkillCategoryEnums;

  @ApiProperty({
    example: true,
    description: 'Indicates whether the skill is active or not',
  })
  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @ApiProperty({
    example: '2025-08-05T08:45:00.123Z',
    description: 'The date and time when the skill was created',
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    example: '2025-08-05T10:15:45.456Z',
    description: 'The date and time when the skill was last updated',
  })
  @UpdateDateColumn()
  updated_at: Date;

  // RELATIONS
  @OneToMany(() => JobSkill, (jobSkill) => jobSkill.skill)
  job_skills: JobSkill[];

  @OneToMany(() => JobSeekerSkill, (jobSeekerSkill) => jobSeekerSkill.skill)
  job_seeker_skills: JobSeekerSkill[];
}
