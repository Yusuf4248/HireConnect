import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity("education")
export class Education {
  @ApiProperty({
    description: "Unique identifier for the education",
    example: "1",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: "ID of the related job seeker",
    example: "1",
  })
  @Column()
  job_seeker_id: number;

  @ApiProperty({ example: "Harvard University" })
  @Column()
  institution_name: string;

  @ApiProperty({ example: "Bachelor of Engineering", required: false })
  @Column({ nullable: true })
  degree?: string;

  @ApiProperty({ example: "Software Engineering", required: false })
  @Column({ nullable: true })
  field_of_study: string;

  @ApiProperty({ example: "2020-09-01", required: false })
  @Column({ type: "date", nullable: true })
  start_date?: Date;

  @ApiProperty({ example: "2024-06-15", required: false })
  @Column({ type: "date", nullable: true })
  end_date?: Date;

  @ApiProperty({ example: true, required: false })
  @Column({ type: "boolean", nullable: true })
  is_current?: boolean;

  @ApiProperty({ example: "Graduated with distinction", required: false })
  @Column({ type: "text", nullable: true })
  description?: string;

  @ApiProperty({
    example: "2025-08-05T08:45:00.123Z",
    description: "The date and time when the skill was created",
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    example: "2025-08-05T10:15:45.456Z",
    description: "The date and time when the skill was last updated",
  })
  @UpdateDateColumn()
  updated_at: Date;
}
