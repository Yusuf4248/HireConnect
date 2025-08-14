import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsNumber,
  IsInt,
  IsDateString,
  IsPositive,
  MaxLength,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { EmploymentType, ExperienceLevel } from "../../common/enums/jobs.enum";

export class CreateJobDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsPositive()
  hr_specialist_id: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @IsPositive()
  company_id: number;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  category_id: number;

  @ApiProperty({ example: "Senior Node.js Developer" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: "Full description of the job..." })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: "3+ years of Node.js experience..." })
  @IsString()
  @IsOptional()
  requirements?: string;

  @ApiPropertyOptional({ example: "Design, develop and maintain..." })
  @IsString()
  @IsOptional()
  responsibilities?: string;

  @ApiPropertyOptional({ example: "Health insurance, gym membership..." })
  @IsString()
  @IsOptional()
  benefits?: string;

  @ApiProperty({ enum: EmploymentType, example: EmploymentType.FULL_TIME })
  @IsEnum(EmploymentType)
  employment_type: EmploymentType;

  @ApiPropertyOptional({ enum: ExperienceLevel, example: ExperienceLevel.MID })
  @IsOptional()
  @IsEnum(ExperienceLevel)
  experience_level?: ExperienceLevel;

  @ApiPropertyOptional({ example: 1000 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  min_salary?: number;

  @ApiPropertyOptional({ example: 3000 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  max_salary?: number;

  @ApiPropertyOptional({ example: "USD", maxLength: 3 })
  @IsOptional()
  @IsString()
  @MaxLength(3)
  currency?: string;

  @ApiPropertyOptional({ example: "Tashkent" })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  is_remote?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiPropertyOptional({ example: "2025-12-25T00:00:00Z" })
  @IsOptional()
  @IsDateString()
  application_deadline?: string;

  @ApiPropertyOptional({ example: 5 })
  @IsOptional()
  @IsInt()
  @IsPositive()
  positions_available?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  views_count?: number;
}
