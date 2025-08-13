import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JobSeeker } from '../../job_seekers/entities/job_seeker.entity';

@Entity('work_experience')
export class WorkExperience {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Work experience ID' })
  id: number;

  @Column()
  @ApiProperty({ example: 5, description: 'Job seeker ID' })
  job_seeker_id: number;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ example: 'Acme Corp', description: 'Company name' })
  company_name: string;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty({ example: 'Software Engineer', description: 'Position title' })
  position: string;

  @Column({
    type: 'enum',
    enum: ['full-time', 'part-time', 'contract', 'internship', 'freelance'],
  })
  @ApiProperty({ example: 'full-time', description: 'Type of employment' })
  employment_type: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({
    example: 'New York, USA',
    description: 'Job location',
    nullable: true,
  })
  location: string;

  @Column({ type: 'date' })
  @ApiProperty({ example: '2020-06-01', description: 'Start date' })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  @ApiProperty({
    example: '2022-08-31',
    description: 'End date',
    nullable: true,
  })
  end_date: Date;

  @Column({ type: 'boolean', default: false })
  @ApiProperty({ example: false, description: 'Is current job?' })
  is_current: boolean;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    example: 'Worked on multiple large-scale projects.',
    description: 'Job description',
    nullable: true,
  })
  description: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    example: 'Increased system performance by 30%.',
    description: 'Achievements',
    nullable: true,
  })
  achievements: string;

  @CreateDateColumn()
  @ApiProperty({
    example: '2025-08-13T10:00:00Z',
    description: 'Record creation date',
  })
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty({
    example: '2025-08-13T10:00:00Z',
    description: 'Last update date',
  })
  updated_at: Date;

  // RELATIONS
  @ManyToOne(() => JobSeeker, (seeker) => seeker.work_experiences)
  @JoinColumn({ name: 'job_seeker_id' })
  job_seeker: JobSeeker;
}
