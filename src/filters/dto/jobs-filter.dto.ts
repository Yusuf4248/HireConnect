import { IsOptional, IsString, IsEnum, IsNumber } from 'class-validator';
import { EmploymentType, ExperienceLevel } from '../../common/enums/jobs.enum';

export class JobsFilterDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() location?: string;
  @IsOptional() @IsNumber() minSalary?: number;
  @IsOptional() @IsNumber() maxSalary?: number;
  @IsOptional() @IsEnum(EmploymentType) employmentType?: EmploymentType;
  @IsOptional() @IsEnum(ExperienceLevel) experienceLevel?: ExperienceLevel;
}
