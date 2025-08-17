import { IsOptional, IsString } from 'class-validator';

export class CompaniesFilterDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() industry?: string;
  @IsOptional() @IsString() location?: string;
}
