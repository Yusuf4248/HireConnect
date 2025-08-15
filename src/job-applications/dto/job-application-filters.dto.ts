import { IsOptional, IsString, IsNumber, IsEnum, IsArray, ArrayNotEmpty } from 'class-validator';

export class JobApplicationFiltersDto {
  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsNumber()
  salary_min?: number;

  @IsOptional()
  @IsNumber()
  salary_max?: number;

  @IsOptional()
  @IsString()
  experience_level?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  work?: string;

  @IsOptional()
  @IsString()
  format?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsString()
  sort_by?: string;

  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  sort_order?: 'ASC' | 'DESC';

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  status?: string[];

  @IsOptional()
  @IsNumber()
  job_id?: number;

  @IsOptional()
  @IsNumber()
  job_seeker_id?: number;

  @IsOptional()
  @IsString()
  applied_at_from?: string;

  @IsOptional()
  @IsString()
  applied_at_to?: string;
}