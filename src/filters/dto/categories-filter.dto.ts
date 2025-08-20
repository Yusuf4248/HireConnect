import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CategoriesFilterDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Filter categories by name (partial or full match)',
    example: 'Software Development',
  })
  name?: string;
}
