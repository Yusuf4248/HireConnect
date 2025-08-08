import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateResumeDto {
  @ApiProperty({ description: 'Job seeker ID associated with the resume', type: Number, example: 123 })
  @IsNumber()
  job_seeker_id: number;

  @ApiProperty({ description: 'Name of the resume file', type: String, example: 'resume.pdf' })
  @IsString()
  file_name: string;

  @ApiProperty({ description: 'File path of the resume', type: String, example: '/uploads/resumes/123_resume.pdf' })
  @IsString()
  file_path: string;

  @ApiProperty({ description: 'Size of the resume file in bytes', type: Number, required: false, example: 1048576 })
  @IsNumber()
  @IsOptional()
  file_size?: number;

  @ApiProperty({ description: 'MIME type of the resume file', type: String, required: false, example: 'application/pdf' })
  @IsString()
  @IsOptional()
  mime_type?: string;

  @ApiProperty({ description: 'Whether this is the primary resume', type: Boolean, required: false, example: true })
  @IsOptional()
  is_primary?: boolean;
}