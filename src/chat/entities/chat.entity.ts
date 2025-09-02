import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { JobApplication } from '../../job-applications/entities/job-application.entity';
import { Message } from '../../messages/entities/messages.entity';
import { HrSpecialist } from '../../hr_specialists/entities/hr_specialist.entity';
import { JobSeeker } from '../../job_seekers/entities/job_seeker.entity';

@Entity('chats')
export class Chat {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the chat',
  })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({
    example: 'active',
    description: 'Status of the chat (e.g., active, closed)',
    required: false,
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  status: string;

  @ApiProperty({
    description: 'List of messages associated with the chat',
    type: () => [Message],
  })

  // RELATION
@ManyToOne(() => HrSpecialist, (hr_spec) => hr_spec.chats, {
  onDelete: 'CASCADE',
})
@JoinColumn({ name: 'hr_specialist_id' })
hr_specialist: HrSpecialist;

@ManyToOne(() => JobSeeker, (job_seeker) => job_seeker.chats, {
  onDelete: 'CASCADE',
})
@JoinColumn({ name: 'job_seeker_id' })
job_seeker: JobSeeker;

@OneToOne(() => JobApplication, (app) => app.chat)
@JoinColumn({ name: 'job_application_id' })
job_application: JobApplication;


  @OneToMany(() => Message, (message) => message.chat, { onDelete: 'CASCADE' })
  messages: Message[];
}
