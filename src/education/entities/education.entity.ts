import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { JobSeeker } from '../../job_seekers/entities/job_seeker.entity';

@Entity('education')
export class Education {
  @ApiProperty({
    description: 'Unique identifier for the education record',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'ID of the related job seeker',
    example: 1,
  })
  @Column()
  job_seeker_id: number;

  @ApiProperty({
    example: 'Harvard University',
    description: 'Name of the educational institution',
  })
  @Column()
  institution_name: string;

  @ApiProperty({
    example: 'Bachelor of Engineering',
    description: 'Degree earned by the job seeker',
    required: false,
    nullable: true,
  })
  @Column({ nullable: true })
  degree?: string;

  @ApiProperty({
    example: 'Software Engineering',
    description: 'Field of study',
    required: false,
    nullable: true,
  })
  @Column({ nullable: true })
  field_of_study: string;

  @ApiProperty({
    example: '2020-09-01',
    description: 'Start date of the education',
    required: false,
    nullable: true,
  })
  @Column({ type: 'date', nullable: true })
  start_date?: Date;

  @ApiProperty({
    example: '2024-06-15',
    description: 'End date of the education',
    required: false,
    nullable: true,
  })
  @Column({ type: 'date', nullable: true })
  end_date?: Date;

  @ApiProperty({
    example: true,
    description: 'Whether the job seeker is currently studying here',
    required: false,
    nullable: true,
  })
  @Column({ type: 'boolean', nullable: true })
  is_current?: boolean;

  @ApiProperty({
    example: 'Graduated with distinction',
    description:
      'Additional details or achievements during the education period',
    required: false,
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({
    example: '2025-08-05T08:45:00.123Z',
    description: 'The date and time when this record was created',
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    example: '2025-08-05T10:15:45.456Z',
    description: 'The date and time when this record was last updated',
  })
  @UpdateDateColumn()
  updated_at: Date;

  // RELATIONS
  @ManyToOne(() => JobSeeker, (seeker) => seeker.educations)
  @JoinColumn({ name: 'job_seeker_id' })
  job_seeker: JobSeeker;
}
