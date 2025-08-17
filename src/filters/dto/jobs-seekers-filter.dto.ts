import { IsOptional, IsString, IsNumber } from 'class-validator';

export class JobSeekersFilterDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() skills?: string; // CSV yoki alohida jadval bo‘lishi mumkin
  @IsOptional() @IsString() location?: string;
  @IsOptional() @IsNumber() minExperience?: number; // yil
  @IsOptional() @IsNumber() maxExperience?: number;
}
