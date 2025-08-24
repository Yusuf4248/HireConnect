import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Chat } from '../../chat/entities/chat.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @ApiProperty({ example: 1, description: 'Unique message ID' })
  id: number;

  @Column({ type: 'bigint' })
  @ApiProperty({ example: 12, description: 'Chat ID to which this message belongs' })
  chat_id: number;

  @Column({ type: 'varchar' })
  @ApiProperty({ example: 'users', description: 'Sender table name (e.g., users, admins)' })
  sender_table_name: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({
    example: 'audio',
    description: 'Message type (text, audio, video, image, document)',
    enum: ['text', 'audio', 'video', 'image', 'document'],
  })
  type: 'text' | 'audio' | 'video' | 'image' | 'document' | null;

  @Column({ type: 'bigint' })
  @ApiProperty({ example: 45, description: 'Sender ID from the corresponding table' })
  sender_id: number;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    example: 'Hello, how are you?',
    description: 'Message text content (optional if file is provided)',
    required: false,
  })
  content: string | null;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    example: 'http://localhost:3000/public/images/audio.webm',
    description: 'URL to the uploaded file (optional)',
    required: false,
  })
  file: string | null;

  @Column({ default: false })
  @ApiProperty({ example: false, description: 'Whether the message has been read' })
  is_read: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({ example: '2025-08-13T14:30:00Z', description: 'When the message was sent' })
  sent_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({ example: '2025-08-13T14:30:00Z', description: 'When the message was created' })
  created_at: Date;

  @ManyToOne(() => Chat, (chat) => chat.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chat_id' })
  @ApiProperty({ type: () => Chat, description: 'The chat this message belongs to' })
  chat: Chat;
}