import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
  JoinColumn,
} from 'typeorm';
import { ProficiencyLevel } from '../../common/enums/job_seeker_skills.enum';
import { JobSeeker } from '../../job_seekers/entities/job_seeker.entity';
import { Skill } from '../../skills/entities/skill.entity';

@Entity('job_seeker_skills')
@Unique(['job_seeker_id', 'skill_id'])
export class JobSeekerSkill {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the job seeker skill record',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 10,
    description: 'ID of the job seeker',
  })
  @Column()
  job_seeker_id: number;

  @ApiProperty({
    example: 5,
    description: 'ID of the skill',
  })
  @Column()
  skill_id: number;

  @ApiProperty({
    example: ProficiencyLevel.EXPERT,
    description: 'Proficiency level of the job seeker in this skill',
    enum: ProficiencyLevel,
    required: false,
  })
  @Column({
    type: 'enum',
    enum: ProficiencyLevel,
    nullable: true,
  })
  proficiency_level?: ProficiencyLevel;

  // RELATIONS
  @ManyToOne(() => JobSeeker, (seeker) => seeker.job_seeker_skills)
  @JoinColumn({ name: 'job_seeker_id' })
  job_seeker: JobSeeker;

  @ManyToOne(() => Skill, (skill) => skill.job_seeker_skills)
  @JoinColumn({ name: 'skill_id' })
  skill: Skill;
}
