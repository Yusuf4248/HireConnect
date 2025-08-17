import { IsOptional, IsString } from 'class-validator';

export class SkillsFilterDto {
  @IsOptional() @IsString() name?: string;
}
