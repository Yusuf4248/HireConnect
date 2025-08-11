import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('resumes')
export class Resume {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  job_seeker_id: number;

  @Column({ type: 'varchar' })
  file_name: string;

  @Column({ type: 'varchar' })
  file_path: string;

  @Column({ type: 'int', nullable: true })
  file_size?: number;

  @Column({ type: 'varchar', nullable: true })
  mime_type?: string;

  @Column({ type: 'boolean', default: false })
  is_primary: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  uploaded_at: Date;
}
