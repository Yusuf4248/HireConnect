import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { WorkExperience } from '../../work_experience/entities/work_experience.entity';

@Entity('job_seekers')
export class JobSeeker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password_hash: string;

  @Column({ type: 'varchar', length: 100 })
  first_name: string;

  @Column({ type: 'varchar', length: 100 })
  last_name: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth: Date;

  @Column({ type: 'enum', enum: ['male', 'female', 'other'], nullable: true })
  gender: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  expected_salary: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  currency: string;

  @Column({
    type: 'enum',
    enum: ['remote', 'office', 'hybrid'],
    nullable: true,
  })
  work_type_preference: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  preferred_job_title: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  contact_id: string;

  @Column({ type: 'enum', enum: ['active', 'inactive'], default: 'active' })
  status: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'varchar', nullable: true })
  refersh_token: string;

  // @ManyToOne(() => User, (user) => user.jobSeekers)
  // @JoinColumn({ name: 'user_id' })
  // user: User;

  //   @OneToMany(() => Resume, (resume) => resume.jobSeeker)
  //   resumes: Resume[];

  @OneToMany(() => WorkExperience, (workExperience) => workExperience.jobSeeker)
  workExperiences: WorkExperience[];

  //   @OneToMany(() => Education, (education) => education.jobSeeker)
  //   educations: Education[];

  //   @OneToMany(() => JobSeekerSkill, (jobSeekerSkill) => jobSeekerSkill.jobSeeker)
  //   jobSeekerSkills: JobSeekerSkill[];

  //   @OneToMany(() => JobApplication, (jobApplication) => jobApplication.jobSeeker)
  //   jobApplications: JobApplication[];

  //   @ManyToOne(() => Contact, (contact) => contact.jobSeekers)
  //   @JoinColumn({ name: "contact_id" })
  //   contact: Contact;
}
