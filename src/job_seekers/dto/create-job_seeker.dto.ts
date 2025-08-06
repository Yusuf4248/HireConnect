import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsString,
  IsNumber,
  IsDate,
  IsEnum,
  IsOptional,
  IsInt,
  Length,
  MaxLength,
  Min,
  Max,
  IsPhoneNumber,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateJobSeekerDto {
  @ApiProperty({
    example: "123e4567-e89b-12d3-a456-426614174000",
    description: "Associated user ID (UUID)",
  })
  @IsString()
  user_id: string;

  @ApiProperty({
    example: "John",
    description: "First name",
    maxLength: 100,
  })
  @IsString()
  @Length(1, 100)
  first_name: string;

  @ApiProperty({
    example: "Doe",
    description: "Last name",
    maxLength: 100,
  })
  @IsString()
  @Length(1, 100)
  last_name: string;

  @ApiPropertyOptional({
    example: "+998901234567",
    description: "Phone number",
    maxLength: 15,
  })
  @IsOptional()
  @IsString()
  @MaxLength(15)
  phone?: string;

  @ApiPropertyOptional({
    example: "1990-01-01",
    description: "Date of birth",
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date_of_birth?: Date;

  @ApiPropertyOptional({
    example: "male",
    description: "Gender",
    enum: ["male", "female", "other"],
  })
  @IsOptional()
  @IsEnum(["male", "female", "other"])
  gender?: string;

  @ApiPropertyOptional({
    example: "Tashkent, Uzbekistan",
    description: "Location",
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  location?: string;

  @ApiPropertyOptional({
    example: "Experienced software developer",
    description: "Short bio",
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({
    example: 5000,
    description: "Expected salary",
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(99999999.99)
  expected_salary?: number;

  @ApiPropertyOptional({
    example: "USD",
    description: "Currency",
    maxLength: 10,
  })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  currency?: string;

  @ApiPropertyOptional({
    example: "remote",
    description: "Work type preference",
    enum: ["remote", "office", "hybrid"],
  })
  @IsOptional()
  @IsEnum(["remote", "office", "hybrid"])
  work_type_preference?: string;

  @ApiPropertyOptional({
    example: "Senior Developer",
    description: "Preferred job title",
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  preferred_job_title?: string;

  @ApiPropertyOptional({
    example: "active",
    description: "Status",
    enum: ["active", "inactive"],
    default: "active",
  })
  @IsOptional()
  @IsEnum(["active", "inactive"])
  status?: string;
}
