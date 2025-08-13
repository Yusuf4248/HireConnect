import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('admin')
export class Admin {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({ example: 'John', description: 'Adminning ismi' })
  @Column({ type: 'varchar', length: 100 })
  first_name: string;

  @ApiProperty({ example: 'Doe', description: 'Adminning familiyasi' })
  @Column({ type: 'varchar', length: 100 })
  last_name: string;

  @ApiProperty({
    example: 'admin@example.com',
    description: 'Admin email manzili',
  })
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @ApiProperty({
    example: 'hashed_password',
    description: 'Parol hash qiymati',
  })
  @Column({ type: 'varchar', length: 255 })
  password_hash: string;

  @ApiProperty({ example: true, description: 'Faollik statusi', default: true })
  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @ApiProperty({
    example: false,
    description: 'Admin tizim yaratuvchisi ekanligi',
    default: false,
  })
  @Column({ type: 'boolean', default: false })
  is_creator: boolean;

  @ApiProperty({
    example: 'refresh_token_string',
    description: 'Refresh token',
    required: false,
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  refresh_token: string;

  @ApiProperty({
    example: '2025-08-11T10:00:00Z',
    description: 'Yaratilgan sana',
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    example: '2025-08-11T10:00:00Z',
    description: 'Yangilangan sana',
  })
  @UpdateDateColumn()
  updated_at: Date;
}
