import { IsOptional, IsString, IsEnum, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { EmploymentType, ExperienceLevel } from '../../common/enums/jobs.enum';

export class JobsFilterDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Filter jobs by title (partial or full match)',
    example: 'Backend Developer',
  })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Filter jobs by location (city or country)',
    example: 'New York',
  })
  location?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'Filter jobs with a minimum salary',
    example: 1000,
  })
  minSalary?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'Filter jobs with a maximum salary',
    example: 5000,
  })
  maxSalary?: number;

  @IsOptional()
  @IsEnum(EmploymentType)
  @ApiPropertyOptional({
    description: 'Filter jobs by employment type',
    enum: EmploymentType,
    example: EmploymentType.FULL_TIME,
  })
  employmentType?: EmploymentType;

  @IsOptional()
  @IsEnum(ExperienceLevel)
  @ApiPropertyOptional({
    description: 'Filter jobs by required experience level',
    enum: ExperienceLevel,
    example: ExperienceLevel,
  })
  experienceLevel?: ExperienceLevel;
}
