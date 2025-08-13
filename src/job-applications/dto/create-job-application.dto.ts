import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { JobApplicationStatuses } from "../../common/enums/job_application.enum";

export class CreateJobApplicationDto {
  @ApiProperty({
    description: "ID of the job seeker who is applying.",
    example: 42,
  })
  @IsNumber()
  @IsNotEmpty()
  job_seeker_id: number;


  @ApiProperty({
    description: "ID of the job seeker who is applying.",
    example: 42,
  })
  @IsNumber()
  @IsNotEmpty()
  job_id: number;

  @ApiProperty({
    description: "ID of the resume to be submitted with the application.",
    example: 101,
  })
  @IsNumber()
  @IsNotEmpty()
  resume_id: number;

  @ApiPropertyOptional({
    description: "Optional cover letter content.",
    example: "I am very interested in this opportunity because...",
  })
  @IsOptional()
  @IsString()
  cover_letter?: string;

  @ApiPropertyOptional({
    description: "Application status",
    enum: JobApplicationStatuses,
    example: JobApplicationStatuses.PENDING,
    default: JobApplicationStatuses.PENDING,
  })
  @IsOptional()
  @IsEnum(JobApplicationStatuses)
  status?: JobApplicationStatuses;

  @ApiPropertyOptional({
    description: "Date and time when the application was submitted.",
    example: "2025-08-07T12:34:56.000Z",
  })
  @IsOptional()
  applied_at?: Date;

  @ApiPropertyOptional({
    description: "Date and time when the application was reviewed.",
    example: "2025-08-08T09:00:00.000Z",
  })
  @IsOptional()
  reviewed_at?: Date;

  @ApiPropertyOptional({
    description: "Additional notes related to the application.",
    example: "Strong portfolio and relevant experience.",
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
