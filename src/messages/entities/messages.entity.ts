import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Chat } from '../../chat/entities/chat.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @ApiProperty({ example: 1, description: 'Unique message ID' })
  id: number;

  @Column({ type: 'bigint' })
  @ApiProperty({
    example: 12,
    description: 'Chat ID to which this message belongs',
  })
  chat_id: number;

  @Column({ type: 'varchar' })
  @ApiProperty({
    example: 'users',
    description: 'Sender table name (e.g., users, admins)',
  })
  sender_table_name: string;

  @Column({ type: 'bigint' })
  @ApiProperty({
    example: 45,
    description: 'Sender ID from the corresponding table',
  })
  sender_id: number;

  @Column({ type: 'text' })
  @ApiProperty({
    example: 'Hello, how are you?',
    description: 'Message content',
  })
  content: string;

  @Column({ default: false })
  @ApiProperty({
    example: false,
    description: 'Whether the message has been read',
  })
  is_read: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    example: '2025-08-13T14:30:00Z',
    description: 'When the message was sent',
  })
  sent_at: Date;

  // RELATIONS
  @ManyToOne(() => Chat, (chat) => chat.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chat_id' })
  chat: Chat;
}
