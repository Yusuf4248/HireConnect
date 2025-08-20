import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class JobSeekersFilterDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Filter job seekers by name (partial or full match)',
    example: 'Alice Johnson',
  })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description:
      'Filter job seekers by skills. Can be a CSV list (e.g. "JavaScript, NestJS") or handled as a separate relation.',
    example: 'JavaScript, NestJS, PostgreSQL',
  })
  skills?: string; // CSV yoki alohida jadval bo‘lishi mumkin

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Filter job seekers by location (city or country)',
    example: 'Berlin',
  })
  location?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'Filter job seekers with minimum years of experience',
    example: 2,
  })
  minExperience?: number; // yil

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'Filter job seekers with maximum years of experience',
    example: 5,
  })
  maxExperience?: number;
}
