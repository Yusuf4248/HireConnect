import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { WorkExperience } from '../../work_experience/entities/work_experience.entity';
import { Resume } from '../../resume/entities/resume.entity';
import { Education } from '../../education/entities/education.entity';
import { JobSeekerSkill } from '../../job_seeker_skills/entities/job_seeker_skill.entity';
import { JobApplication } from '../../job-applications/entities/job-application.entity';

@Entity('job_seekers')
export class JobSeeker {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the job seeker',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the job seeker',
  })
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @ApiProperty({ example: '$2b$10$...', description: 'Hashed password' })
  @Column({ type: 'varchar', length: 255 })
  password_hash: string;

  @ApiProperty({ example: 'John', description: 'First name of the job seeker' })
  @Column({ type: 'varchar', length: 100 })
  first_name: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the job seeker' })
  @Column({ type: 'varchar', length: 100 })
  last_name: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Phone number',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 15, nullable: true })
  phone: string;

  @ApiProperty({
    example: '1995-05-20',
    description: 'Date of birth',
    nullable: true,
  })
  @Column({ type: 'date', nullable: true })
  date_of_birth: Date;

  @ApiProperty({
    example: 'male',
    description: 'Gender',
    enum: ['male', 'female', 'other'],
    nullable: true,
  })
  @Column({ type: 'enum', enum: ['male', 'female', 'other'], nullable: true })
  gender: string;

  @ApiProperty({
    example: 'Tashkent, Uzbekistan',
    description: 'Current location',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  location: string;

  @ApiProperty({
    example: 'Passionate full-stack developer.',
    description: 'Biography',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  bio: string;

  @ApiProperty({
    example: 1500.0,
    description: 'Expected salary',
    nullable: true,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  expected_salary: number;

  @ApiProperty({
    example: 'USD',
    description: 'Preferred currency',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 10, nullable: true })
  currency: string;

  @ApiProperty({
    example: 'remote',
    description: 'Work type preference',
    enum: ['remote', 'office', 'hybrid'],
    nullable: true,
  })
  @Column({
    type: 'enum',
    enum: ['remote', 'office', 'hybrid'],
    nullable: true,
  })
  work_type_preference: string;

  @ApiProperty({
    example: 'Senior Backend Developer',
    description: 'Preferred job title',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 100, nullable: true })
  preferred_job_title: string;

  @ApiProperty({
    example: '2024-08-13T12:34:56.000Z',
    description: 'Record creation date',
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    example: '2024-08-15T12:34:56.000Z',
    description: 'Record update date',
  })
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty({ example: 'abc123', description: 'Contact ID', nullable: true })
  @Column({ nullable: true })
  contact_id: string;

  @ApiProperty({
    example: 'active',
    description: 'Status',
    enum: ['active', 'inactive'],
    default: 'active',
  })
  @Column({ type: 'enum', enum: ['active', 'inactive'], default: 'active' })
  status: string;

  @ApiProperty({ example: true, description: 'Is active status flag' })
  @Column({ type: 'boolean', default: false })
  is_active: boolean;

  @ApiProperty({
    example: 'refresh_token_example',
    description: 'Refresh token',
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  refersh_token: string;

  // RELATIONS
  @OneToMany(() => JobApplication, (app) => app.job_seeker)
  applications: JobApplication[];

  @OneToMany(() => Resume, (resume) => resume.job_seeker)
  resumes: Resume[];

  @OneToMany(() => Education, (edu) => edu.job_seeker)
  educations: Education[];

  @OneToMany(() => WorkExperience, (exp) => exp.job_seeker)
  work_experiences: WorkExperience[];

  @OneToMany(() => JobSeekerSkill, (skill) => skill.job_seeker)
  job_seeker_skills: JobSeekerSkill[];
}
