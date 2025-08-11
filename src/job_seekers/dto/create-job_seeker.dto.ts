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
  IsEmail,
  IsBoolean,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateJobSeekerDto {
  @ApiProperty({
      example: "user@example.com",
      description: "User email address",
    })
    @IsEmail({}, { message: "Invalid email format" })
    @Length(5, 255, { message: "Email must be between 5 and 255 characters" })
    email: string;
  
    @ApiProperty({
      example: "securePassword123",
      description: "User password (will be hashed)",
      minLength: 8,
      maxLength: 255,
    })
    @IsString({ message: "Password must be a string" })
    @Length(8, 255, { message: "Password must be between 8 and 255 characters" })
    password_hash: string;

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

  @ApiPropertyOptional({
      example: true,
      description: "Is user active",
      default: true,
    })
    @IsOptional()
    @IsBoolean({ message: "is_active must be a boolean value" })
    is_active?: boolean;
}
