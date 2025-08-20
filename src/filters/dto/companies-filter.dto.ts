import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CompaniesFilterDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Filter companies by name (partial or full match)',
    example: 'Tech Solutions Inc',
  })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Filter companies by industry sector',
    example: 'Information Technology',
  })
  industry?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Filter companies by location (city or country)',
    example: 'San Francisco',
  })
  location?: string;
}
