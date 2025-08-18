import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCompanyHrSpecialistDto {
  @ApiProperty({
    example: 1,
    description: 'Company ID',
  })
  @IsInt({ message: 'Company ID must be an integer' })
  @Type(() => Number)
  @IsNotEmpty({ message: 'Company ID is required' })
  company_id: number;

  @ApiProperty({
    example: 1,
    description: 'HR Specialist ID',
  })
  @IsInt({ message: 'HR Specialist ID must be an integer' })
  @Type(() => Number)
  @IsNotEmpty({ message: 'HR Specialist ID is required' })
  hr_specialist_id: number;
}
