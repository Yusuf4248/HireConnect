import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsUrl } from "class-validator";

export class CreateContactDto {
  @ApiPropertyOptional({
    example: "https://github.com/username",
    description: "GitHub profile URL",
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  github_url?: string;

  @ApiPropertyOptional({
    example: "https://mywebsite.com",
    description: "Personal website URL",
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  website?: string;

  @ApiPropertyOptional({
    example: "https://linkedin.com/in/username",
    description: "LinkedIn profile URL",
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  linkedIn_url?: string;

  @ApiPropertyOptional({
    example: "https://t.me/username",
    description: "Telegram profile URL",
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  telegram_url?: string;
}
