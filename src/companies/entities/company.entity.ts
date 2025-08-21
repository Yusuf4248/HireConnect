import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Job } from '../../jobs/entities/job.entity';
import { CompanyHrSpecialist } from '../../company_hr_specialists/entities/company_hr_specialist.entity';

@Entity('companies')
export class Company {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the company',
  })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({
    example: 'Tech Solutions Ltd',
    description: 'Name of the company',
  })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({
    example:
      'A software development company specializing in web and mobile solutions.',
    description: 'Detailed description of the company',
    required: false,
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({
    example: 'https://www.techsolutions.com',
    description: 'Official website of the company',
    required: false,
    nullable: true,
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  website: string;

  @ApiProperty({
    example: 'https://cdn.example.com/logo.png',
    description: 'Logo URL of the company',
    required: false,
    nullable: true,
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  logo_url: string;

  @ApiProperty({
    example: 'Information Technology',
    description: 'Industry sector of the company',
  })
  @Column({ type: 'varchar', length: 100 })
  industry: string;

  @ApiProperty({
    example: 'New York, USA',
    description: 'Location of the company',
  })
  @Column({ type: 'varchar', length: 200 })
  location: string;

  @ApiProperty({
    example: '+1-202-555-0147',
    description: 'Contact phone number of the company',
  })
  @Column({ type: 'varchar', length: 100 })
  phone: string;

  @ApiProperty({
    example: 'contact@techsolutions.com',
    description: 'Contact email of the company',
  })
  @Column({ type: 'varchar', length: 100 })
  email: string;

  @ApiProperty({
    example: 2015,
    description: 'Year the company was founded',
  })
  @Column({ type: 'int' })
  founded_year: number;

  @ApiProperty({
    example: true,
    description: 'Indicates whether the company is verified',
  })
  @Column({ type: 'boolean', default: false })
  is_verified: boolean;

  @ApiProperty({
    example: '2025-08-13T12:34:56.000Z',
    description: 'Date when the company record was created',
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    example: '2025-08-13T15:21:30.000Z',
    description: 'Date when the company record was last updated',
  })
  @UpdateDateColumn()
  updated_at: Date;

  // RELATIONS
  @OneToMany(() => Job, (job) => job.company)
  jobs: Job[];

  @OneToMany(
    () => CompanyHrSpecialist,
    (companyHrSpecialist) => companyHrSpecialist.company,
  )
  companyHrSpecialist: CompanyHrSpecialist[];
}
