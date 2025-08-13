import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsBoolean,
  IsOptional,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    example: 'John',
    description: 'Admin first name',
    required: true,
    maxLength: 100,
  })
  @IsString()
  @MaxLength(100)
  first_name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Admin last name',
    required: true,
    maxLength: 100,
  })
  @IsString()
  @MaxLength(100)
  last_name: string;

  @ApiProperty({
    example: 'admin@example.com',
    description: 'Admin email address',
    required: true,
    maxLength: 255,
  })
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty({
    example: 'SecurePassword123!',
    description:
      'Password (min 8 chars, at least 1 letter, 1 number and 1 special char)',
    required: true,
    minLength: 8,
    maxLength: 255,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
    message:
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',
  })
  password_hash: string;
}
