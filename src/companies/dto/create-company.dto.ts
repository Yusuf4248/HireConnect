import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsUrl,
  IsEmail,
  IsInt,
  Min,
  Max,
  Length,
  IsPhoneNumber,
} from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({
    description: 'Company name',
    type: String,
    example: 'Tech Corp',
  })
  @IsString({ message: 'Company name must be a string' })
  @Length(2, 100, {
    message: 'Company name must be between 2 and 100 characters',
  })
  name: string;

  @ApiProperty({
    description: 'Company description',
    type: String,
    required: false,
    example: 'A tech company',
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @Length(5, 500, {
    message: 'Description must be between 5 and 500 characters',
  })
  description?: string;

  @ApiProperty({
    description: 'Company website',
    type: String,
    required: false,
    example: 'https://techcorp.com',
  })
  @IsOptional()
  @IsUrl({}, { message: 'Website must be a valid URL' })
  website?: string;

  @ApiProperty({
    description: 'Industry type',
    type: String,
    example: 'Technology',
  })
  @IsString({ message: 'Industry must be a string' })
  @Length(2, 50, { message: 'Industry must be between 2 and 50 characters' })
  industry: string;

  @ApiProperty({
    description: 'Company location',
    type: String,
    example: 'New York, NY',
  })
  @IsString({ message: 'Location must be a string' })
  @Length(2, 100, { message: 'Location must be between 2 and 100 characters' })
  location: string;

  @ApiProperty({
    description: 'Contact phone number',
    type: String,
    example: '+998901234567',
  })
  @IsString({ message: 'Phone must be a string' })
  @IsPhoneNumber('UZ')
  phone: string;

  @ApiProperty({
    description: 'Contact email',
    type: String,
    example: 'contact@techcorp.com',
  })
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @ApiProperty({
    description: 'Year founded',
    type: Number,
    example: 2010,
  })
  @Type(() => Number)
  @IsInt({ message: 'Founded year must be an integer' })
  @Min(1800, { message: 'Founded year must be after 1800' })
  @Max(new Date().getFullYear(), {
    message: `Founded year cannot be in the future`,
  })
  founded_year: number;
}
