import { Entity, Column,  CreateDateColumn, UpdateDateColumn,  PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
export class Company {
  @PrimaryGeneratedColumn({type:"bigint"})
  id: number;
 
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  website: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  logo_url: string;

  @Column({ type: 'varchar', length: 100 })
  industry: string;

  @Column({ type: 'enum', enum: ['SMALL', 'MEDIUM', 'LARGE'] })
  company_size: string;

  @Column({ type: 'varchar', length: 200 })
  location: string;

  @Column({ type: 'varchar', length: 100 })
  phone: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'int' })
  founded_year: number;

  @Column({ type: 'boolean', default: false })
  is_verified: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}