import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  Length,
  MaxLength,
  IsPhoneNumber,
} from "class-validator";

export class CreateHrSpecialistDto {
  @ApiProperty({
    example: 1,
    description: "Associated user ID",
  })
  @IsNumber()
  user_id: number;

  @ApiProperty({
    example: 1,
    description: "Associated company ID",
  })
  @IsNumber()
  company_id: number;

  @ApiProperty({
    example: "John",
    description: "First name of the HR specialist",
    maxLength: 100,
  })
  @IsString()
  @Length(1, 100, {
    message: "First name must be between 1 and 100 characters",
  })
  first_name: string;

  @ApiProperty({
    example: "Doe",
    description: "Last name of the HR specialist",
    maxLength: 100,
  })
  @IsString()
  @Length(1, 100, { message: "Last name must be between 1 and 100 characters" })
  last_name: string;

  @ApiPropertyOptional({
    example: "HR Manager",
    description: "Position in the company",
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: "Position must not exceed 100 characters" })
  position?: string;

  @ApiPropertyOptional({
    example: "+1234567890",
    description: "Phone number",
    maxLength: 15,
  })
  @IsOptional()
  @IsString()
  @MaxLength(15, { message: "Phone number must not exceed 15 characters" })
  @IsPhoneNumber(undefined, { message: "Invalid phone number format" })
  phone?: string;

  @ApiPropertyOptional({
    example: "Human Resources",
    description: "Department name",
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: "Department must not exceed 100 characters" })
  department?: string;

  @ApiPropertyOptional({
    example: false,
    description: "Is this HR specialist a company admin",
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  is_company_admin?: boolean;
}
