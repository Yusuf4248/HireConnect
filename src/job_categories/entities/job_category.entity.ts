import { ApiProperty } from '@nestjs/swagger';
import { Job } from 'src/jobs/entities/job.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('job_categories')
export class JobCategory {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the job category',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Software Development',
    description: 'Name of the job category',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'Jobs related to software development and programming',
    description: 'Description of the job category',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({
    example: 2,
    description: 'ID of the parent category if exists',
    required: false,
  })
  @Column({ nullable: true })
  parent_id?: number;

  // RELATIONS
  @ManyToOne(() => JobCategory, (category) => category.children, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'parent_id' })
  parent?: JobCategory;

  @OneToMany(() => JobCategory, (category) => category.parent)
  children: JobCategory[];

  @ApiProperty({
    example: true,
    description: 'Indicates if the job category is active',
  })
  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @ApiProperty({
    example: '2025-08-13T10:15:30Z',
    description: 'Date when the job category was created',
  })
  @CreateDateColumn()
  created_at: Date;

    @OneToMany(() => Job, (job) => job.company)
    jobs: Job[];
}
