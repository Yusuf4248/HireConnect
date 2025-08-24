import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { EmploymentType, ExperienceLevel } from '../../common/enums/jobs.enum';
import { HrSpecialist } from 'src/hr_specialists/entities/hr_specialist.entity';
import { Company } from 'src/companies/entities/company.entity';
import { JobApplication } from '../../job-applications/entities/job-application.entity';
import { JobSkill } from '../../job_skills/entities/job_skill.entity';
import { ApiProperty } from '@nestjs/swagger';
import { JobCategory } from 'src/job_categories/entities/job_category.entity';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Unique identifier of the job' })
  id: number;

  @Column({ type: 'int' })
  @ApiProperty({
    example: 5,
    description: 'ID of the HR specialist who posted the job',
  })
  hr_specialist_id: number;

  @Column({ type: 'int' })
  @ApiProperty({
    example: 2,
    description: 'ID of the company offering the job',
  })
  company_id: number;

  @Column({ type: 'int', nullable: true })
  @ApiProperty({ example: 3, description: 'Job category ID', nullable: true })
  category_id?: number;

  @Column()
  @ApiProperty({ example: 'Frontend Developer', description: 'Job title' })
  title: string;

  @Column('text')
  @ApiProperty({
    example: 'We are looking for a skilled frontend developer...',
    description: 'Detailed job description',
  })
  description: string;

  @Column('text', { nullable: true })
  @ApiProperty({
    example: '3+ years of experience in React.js',
    description: 'Job requirements',
    nullable: true,
  })
  requirements?: string;

  @Column('text', { nullable: true })
  @ApiProperty({
    example: 'Develop and maintain UI components',
    description: 'Job responsibilities',
    nullable: true,
  })
  responsibilities?: string;

  @Column('text', { nullable: true })
  @ApiProperty({
    example: 'Health insurance, paid time off',
    description: 'Job benefits',
    nullable: true,
  })
  benefits?: string;

  @Column({ type: 'enum', enum: EmploymentType })
  @ApiProperty({
    example: EmploymentType,
    description: 'Type of employment',
    enum: EmploymentType,
  })
  employment_type: EmploymentType;

  @Column({ type: 'enum', enum: ExperienceLevel, nullable: true })
  @ApiProperty({
    example: ExperienceLevel,
    description: 'Required experience level',
    enum: ExperienceLevel,
    nullable: true,
  })
  experience_level?: ExperienceLevel;

  @Column('decimal', { nullable: true })
  @ApiProperty({
    example: 500.0,
    description: 'Minimum offered salary',
    nullable: true,
  })
  min_salary?: number;

  @Column('decimal', { nullable: true })
  @ApiProperty({
    example: 1500.0,
    description: 'Maximum offered salary',
    nullable: true,
  })
  max_salary?: number;

  @Column({ type: 'varchar', length: 3, nullable: true })
  @ApiProperty({ example: 'USD', description: 'Currency code', nullable: true })
  currency?: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'Tashkent',
    description: 'Job location',
    nullable: true,
  })
  location: string;

  @Column({ type: 'boolean', default: false })
  @ApiProperty({
    example: true,
    description: 'Indicates if the job can be done remotely',
  })
  is_remote: boolean;

  @Column({ type: 'boolean', default: true })
  @ApiProperty({
    example: true,
    description: 'Indicates if the job posting is active',
  })
  is_active: boolean;

  @Column({ type: 'date', nullable: true })
  @ApiProperty({
    example: '2025-12-31',
    description: 'Deadline for applications',
    nullable: true,
  })
  application_deadline?: Date;

  @Column({ type: 'int', nullable: true })
  @ApiProperty({
    example: 3,
    description: 'Number of available positions',
    nullable: true,
  })
  positions_available?: number;

  @Column({ type: 'int', default: 0 })
  @ApiProperty({
    example: 120,
    description: 'Number of times the job posting has been viewed',
  })
  views_count: number;

  @CreateDateColumn()
  @ApiProperty({
    example: '2025-08-13T10:00:00Z',
    description: 'Date when the job posting was created',
  })
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty({
    example: '2025-08-13T15:30:00Z',
    description: 'Date when the job posting was last updated',
  })
  updated_at: Date;

  // RELATIONS (Swagger qo‘shilmaydi)
  @ManyToOne(() => Company, (company) => company.jobs)
  company: Company;

  @ManyToOne(() => JobCategory, (category) => category.jobs)
  category: JobCategory;

  @ManyToOne(() => HrSpecialist, (hr) => hr.jobs)
  hr_specialist: HrSpecialist;

  @OneToMany(() => JobApplication, (app) => app.job)
  applications: JobApplication[];

  @OneToMany(() => JobSkill, (skill) => skill.job)
  job_skills: JobSkill[];
}
