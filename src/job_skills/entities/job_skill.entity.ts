import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SkillLevel } from '../../common/enums/job_skills.enum';
import { Skill } from '../../skills/entities/skill.entity';
import { Job } from '../../jobs/entities/job.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('job_skills')
@Index(['job_id', 'skill_id'], { unique: true })
export class JobSkill {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the job skill',
  })
  id: number;

  @Column()
  @ApiProperty({ example: 5, description: 'ID of the related job' })
  job_id: number;

  @Column()
  @ApiProperty({ example: 3, description: 'ID of the related skill' })
  skill_id: number;

  @Column({ type: 'boolean', nullable: true })
  @ApiProperty({
    example: true,
    description: 'Indicates if the skill is required',
    nullable: true,
  })
  is_required?: boolean;

  @Column({
    type: 'enum',
    enum: SkillLevel,
    nullable: true,
  })
  @ApiProperty({
    example: SkillLevel,
    description: 'Minimum required skill level',
    enum: SkillLevel,
    nullable: true,
  })
  minimum_level?: SkillLevel;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({
    example: '2025-08-13T12:34:56Z',
    description: 'Record creation date',
  })
  created_at: Date;

  // RELATIONS
  @ManyToOne(() => Job, (job) => job.job_skills)
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @ManyToOne(() => Skill, (skill) => skill.job_skills)
  @JoinColumn({ name: 'skill_id' })
  skill: Skill;
}
