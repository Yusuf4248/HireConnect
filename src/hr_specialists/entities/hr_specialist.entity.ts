import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Job } from '../../jobs/entities/job.entity';
import { CompanyHrSpecialist } from '../../company_hr_specialists/entities/company_hr_specialist.entity';
import { Chat } from '../../chat/entities/chat.entity';

@Entity('hr_specialists')
export class HrSpecialist {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the HR specialist',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'hr@example.com',
    description: 'Email address of the HR specialist',
  })
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @ApiProperty({
    example: '$2b$10$hashedpassword',
    description: 'Hashed password of the HR specialist',
  })
  @Column({ type: 'varchar', length: 255 })
  password_hash: string;

  @ApiProperty({
    example: 'John',
    description: 'First name of the HR specialist',
  })
  @Column({ type: 'varchar', length: 100 })
  first_name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the HR specialist',
  })
  @Column({ type: 'varchar', length: 100 })
  last_name: string;

  @ApiProperty({
    example: 'HR Manager',
    description: 'Position of the HR specialist in the company',
    required: false,
  })
  @Column({ type: 'varchar', length: 100, nullable: true })
  position: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Phone number of the HR specialist',
    required: false,
  })
  @Column({ type: 'varchar', length: 15, nullable: true })
  phone: string;

  @ApiProperty({
    example: 'Human Resources',
    description: 'Department where the HR specialist works',
    required: false,
  })
  @Column({ type: 'varchar', length: 100, nullable: true })
  department: string;

  @ApiProperty({
    example: '2025-08-05T08:45:00.123Z',
    description: 'The date and time when the HR specialist was created',
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    example: '2025-08-05T10:15:45.456Z',
    description: 'The date and time when the HR specialist was last updated',
  })
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty({
    example: true,
    description: 'Indicates if the HR specialist account is active',
  })
  @Column({ type: 'boolean', default: false })
  is_active: boolean;

  @ApiProperty({
    example: 'refreshTokenExample123',
    description: 'Refresh token for the HR specialist (if logged in)',
    required: false,
  })
  @Column({ type: 'varchar', nullable: true })
  refresh_token: string;

  // RELATIONS
  @OneToMany(() => Job, (job) => job.hr_specialist)
  jobs: Job[];

  @OneToMany(
    () => CompanyHrSpecialist,
    (companyHrSpecialist) => companyHrSpecialist.hrSpecialist,
  )
  companyHrSpecialist: CompanyHrSpecialist[];

  @OneToMany(() => Chat, (chat) => chat.hr_specialist)
  chats: Chat[];
}
