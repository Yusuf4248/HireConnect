import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { JobApplicationStatuses } from "../../common/enums/job_application.enum";
import { Job } from "src/jobs/entities/job.entity";
import { JobSeeker } from "../../job_seekers/entities/job_seeker.entity";
import { Chat } from "../../chat/entities/chat.entity";

@Entity('job-application')
export class JobApplication {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the job application.',
    readOnly: true,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Identifier of the job seeker who submitted the application.',
    example: 42,
    type: Number,
  })
  @Column()
  job_seeker_id: number;

  @ApiProperty({
    description: 'Identifier of the job seeker who submitted the application.',
    example: 42,
    type: Number,
  })
  @Column()
  job_id: number;

  @ApiProperty({
    description: 'Identifier of the resume associated with this application.',
    example: 101,
    type: Number,
  })
  @Column()
  resume_id: number;

  @ApiProperty({
    description: 'Optional cover letter provided by the job seeker.',
    example: 'I am excited to apply for this position because...',
    type: String,
    required: false,
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  cover_letter: string;

  @ApiProperty({
    description: 'Current status of the job application.',
    enum: JobApplicationStatuses,
    example: JobApplicationStatuses.PENDING,
    default: JobApplicationStatuses.PENDING,
  })
  @Column({
    type: 'enum',
    enum: JobApplicationStatuses,
    default: JobApplicationStatuses.PENDING,
  })
  status: JobApplicationStatuses;

  @ApiProperty({
    description: 'Timestamp when the application was submitted.',
    example: '2024-08-07T12:34:56.000Z',
    type: String,
    format: 'date-time',
    required: false,
    nullable: true,
  })
  @Column({ default: new Date(), nullable: true })
  applied_at: Date;

  @ApiProperty({
    description: 'Timestamp when the application was reviewed.',
    example: '2024-08-08T09:00:00.000Z',
    type: String,
    format: 'date-time',
    required: false,
    nullable: true,
  })
  @Column({ nullable: true })
  reviewed_at: Date;

  @ApiProperty({
    description: 'Additional notes or comments regarding the application.',
    example: 'Candidate has relevant experience in the required field.',
    type: String,
    required: false,
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  notes: string;

  // RELATIONS
  @ManyToOne(() => Job, (job) => job.applications)
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @ManyToOne(() => JobSeeker, (seeker) => seeker.applications)
  @JoinColumn({ name: 'job_seeker_id' })
  job_seeker: JobSeeker;

  @OneToOne(() => Chat, (chat) => chat.job_application)
  chat: Chat;
}
