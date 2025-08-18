// src/contacts/dto/create-contact.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({
    example: 'Telegram',
    description: 'Name of link',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'https://t.me/username',
    description: 'URL',
    nullable: true,
  })
  @IsOptional()
  @IsUrl({}, { message: 'Invalid URL format' })
  url?: string;
}
