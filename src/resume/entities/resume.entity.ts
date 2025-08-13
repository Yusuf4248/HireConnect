import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { JobSeeker } from '../../job_seekers/entities/job_seeker.entity';

@Entity('resumes')
export class Resume {
  @ApiProperty({
    description: 'Unique identifier for the resume',
    type: Number,
  })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({ description: 'Job seeker ID associated with the resume' })
  @Column({ type: 'bigint' })
  job_seeker_id: number;

  @ApiProperty({ description: 'Name of the resume file', type: String })
  @Column({ type: 'varchar' })
  file_name: string;

  @ApiProperty({ description: 'File path of the resume', type: String })
  @Column({ type: 'varchar' })
  file_path: string;

  @ApiProperty({
    description: 'Size of the resume file in bytes',
    type: Number,
    nullable: true,
  })
  @Column({ type: 'int', nullable: true })
  file_size?: number;

  @ApiProperty({
    description: 'MIME type of the resume file',
    type: String,
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  mime_type?: string;

  @ApiProperty({
    description: 'Whether this is the primary resume',
    type: Boolean,
  })
  @Column({ type: 'boolean', default: false })
  is_primary: boolean;

  @ApiProperty({
    description: 'Timestamp of when the resume was uploaded',
    type: String,
    format: 'date-time',
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  uploaded_at: Date;

  // RELATIONS
  @ManyToOne(() => JobSeeker, (seeker) => seeker.resumes)
  @JoinColumn({ name: 'job_seeker_id' })
  job_seeker: JobSeeker;
}