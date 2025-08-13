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
    example: 'https://github.com/username',
    description: 'GitHub profile URL',
    required: false,
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  github_url: string;

  @ApiProperty({
    example: 'https://mywebsite.com',
    description: 'Personal website URL',
    required: false,
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  website: string;

  @ApiProperty({
    example: 'https://linkedin.com/in/username',
    description: 'LinkedIn profile URL',
    required: false,
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  linkedIn_url: string;

  @ApiProperty({
    example: 'https://t.me/username',
    description: 'Telegram profile URL',
    required: false,
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  telegram_url: string;

  // RELATION
  @OneToOne(() => Company, (company) => company.contact)
  company: Company;
}
