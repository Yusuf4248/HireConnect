import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEmail,
  IsEnum,
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from "class-validator";

export class CreateUserDto {
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

  @ApiPropertyOptional({
    example: "user",
    description: "User role (user, admin, hr)",
    enum: ["user", "admin", "hr"],
    default: "user",
  })
  @IsOptional()
  @IsEnum(["user", "admin", "hr"], {
    message: "Role must be one of: user, admin, hr",
  })
  role?: string;

  @ApiPropertyOptional({
    example: true,
    description: "Is user active",
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: "is_active must be a boolean value" })
  is_active?: boolean;


}

