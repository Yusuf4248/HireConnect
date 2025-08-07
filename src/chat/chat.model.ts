import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Message } from '../messages/messages.model';

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  application_id: number;

  @Column({ type: 'bigint' })
  hr_id: number;

  @Column({ type: 'bigint' })
  job_seeker_id: number;

  @Column({ type: 'varchar', nullable: true })
  status: string;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];
}
