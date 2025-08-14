import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { JobApplication } from '../../job-applications/entities/job-application.entity';
import { Message } from '../../messages/entities/messages.entity';

@Entity('chats')
export class Chat {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the chat',
  })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({
    example: 101,
    description: 'ID of the related job application',
  })
  @Column({ type: 'bigint' })
  application_id: number;

  @ApiProperty({
    example: 5,
    description: 'ID of the HR specialist',
  })
  @Column({ type: 'bigint' })
  hr_id: number;

  @ApiProperty({
    example: 12,
    description: 'ID of the job seeker',
  })
  @Column({ type: 'bigint' })
  job_seeker_id: number;

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
  @OneToOne(() => JobApplication, (app) => app.chat)
  @JoinColumn({ name: 'job_application_id' })
  job_application: JobApplication;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];
}
