import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SkillsFilterDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Filter skills by name (partial or full match)',
    example: 'JavaScript',
  })
  name?: string;
}
