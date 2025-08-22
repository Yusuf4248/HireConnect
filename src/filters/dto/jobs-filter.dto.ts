import { ApiPropertyOptional } from '@nestjs/swagger';
import { EmploymentType, ExperienceLevel } from '../../common/enums/jobs.enum';

export class JobsFilterDto {
  @ApiPropertyOptional({ enum: ExperienceLevel })
  experience_level?: ExperienceLevel;

  @ApiPropertyOptional({ enum: EmploymentType })
  employment_type?: EmploymentType;

  @ApiPropertyOptional({ example: 'USD' })
  currency?: string;

  @ApiPropertyOptional({ example: 500 })
  min_salary?: number;

  @ApiPropertyOptional({ example: 1500 })
  max_salary?: number;

  @ApiPropertyOptional({ example: 'Tashkent' })
  location?: string;

  @ApiPropertyOptional({ example: '5/2' })
  work_days?: string;

  @ApiPropertyOptional({ example: 3 })
  category_id?: number;

  @ApiPropertyOptional({ example: 2 })
  company_id?: number;

  @ApiPropertyOptional({ type: [Number], example: [1, 2, 3] })
  skills?: number[];
}
