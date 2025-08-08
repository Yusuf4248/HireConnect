import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateResumeDto {
  @ApiProperty({ description: 'Job seeker ID associated with the resume', type: Number, example: 123 })
  @IsNumber()
  @Type(() => Number) // Convert string to number
  job_seeker_id: number;

  @ApiProperty({ description: 'Whether this is the primary resume', type: Boolean, required: false, example: true })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean) // Convert string to boolean
  is_primary?: boolean;
}