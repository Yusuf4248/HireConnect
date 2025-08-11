import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ description: 'Company name', type: String, example: 'Tech Corp' })
  name: string;

  @ApiProperty({ description: 'Company description', type: String, required: false, example: 'A tech company' })
  description?: string;

  @ApiProperty({ description: 'Company website', type: String, required: false, example: 'https://techcorp.com' })
  website?: string;

  @ApiProperty({ description: 'Company logo URL', type: String, required: false, example: 'https://techcorp.com/logo.png' })
  logo_url?: string;

  @ApiProperty({ description: 'Industry type', type: String, example: 'Technology' })
  industry: string;

  @ApiProperty({ description: 'Company size', enum: ['SMALL', 'MEDIUM', 'LARGE'], example: 'MEDIUM' })
  company_size: 'SMALL' | 'MEDIUM' | 'LARGE';

  @ApiProperty({ description: 'Company location', type: String, example: 'New York, NY' })
  location: string;

  @ApiProperty({ description: 'Contact phone number', type: String, example: '+1234567890' })
  phone: string;

  @ApiProperty({ description: 'Contact email', type: String, example: 'contact@techcorp.com' })
  email: string;

  @ApiProperty({ description: 'Year founded', type: Number, example: 2010 })
  founded_year: number;

  @ApiProperty({ description: 'Verification status', type: Boolean, required: false, example: true })
  is_verified?: boolean;
}