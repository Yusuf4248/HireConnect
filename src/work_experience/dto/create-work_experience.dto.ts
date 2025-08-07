import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsString,
  IsNumber,
  IsDate,
  IsEnum,
  IsBoolean,
  IsOptional,
  Length,
  MaxLength,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateWorkExperienceDto {
  @ApiProperty({
    example: 1,
    description: "Job seeker ID associated with this work experience",
  })
  @IsNumber()
  job_seeker_id: number;

  @ApiProperty({
    example: "Acme Corporation",
    description: "Name of the company",
    maxLength: 255,
  })
  @IsString()
  @Length(1, 255, {
    message: "Company name must be between 1 and 255 characters",
  })
  company_name: string;

  @ApiProperty({
    example: "Software Engineer",
    description: "Position held at the company",
    maxLength: 100,
  })
  @IsString()
  @Length(1, 100, { message: "Position must be between 1 and 100 characters" })
  position: string;

  @ApiProperty({
    example: "full-time",
    description: "Type of employment",
    enum: ["full-time", "part-time", "contract", "internship", "freelance"],
  })
  @IsEnum(["full-time", "part-time", "contract", "internship", "freelance"], {
    message: "Invalid employment type",
  })
  employment_type: string;

  @ApiPropertyOptional({
    example: "San Francisco, CA",
    description: "Location of the job",
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255, { message: "Location must not exceed 255 characters" })
  location?: string;

  @ApiProperty({
    example: "2020-01-01",
    description: "Start date of employment",
  })
  @Type(() => Date)
  @IsDate()
  start_date: Date;

  @ApiPropertyOptional({
    example: "2022-12-31",
    description: "End date of employment (null if current)",
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  end_date?: Date;

  @ApiPropertyOptional({
    example: false,
    description: "Is this the current employment",
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  is_current?: boolean;

  @ApiPropertyOptional({
    example:
      "Developed and maintained web applications using React and Node.js",
    description: "Job description",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: "Employee of the Month (June 2021)",
    description: "Notable achievements",
  })
  @IsOptional()
  @IsString()
  achievements?: string;
}
