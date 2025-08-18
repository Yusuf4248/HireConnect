import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from '../../companies/entities/company.entity';

@Entity('contacts')
export class Contact {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the contact',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Hr',
    description: 'User(Hr, JobSeeker or Company)',
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  table_name: string;

  @ApiProperty({
    example: 1,
    description: 'User`s id',
    nullable: true,
  })
  @Column({ type: 'integer', nullable: true })
  table_id: number;

  @ApiProperty({
    example: 'Telegram',
    description: 'Name of link',
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  name: string;

  @ApiProperty({
    example: 'https://t.me/username',
    description: 'URL',
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  url: string;
}
