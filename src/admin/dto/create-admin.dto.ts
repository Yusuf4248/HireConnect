import { IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({ description: 'User ID associated with the admin', type: Number, example: 123 })
  @IsNumber()
  user_id: number;

  @ApiProperty({ description: 'Whether the admin is a creator', type: Boolean, example: true })
  @IsBoolean()
  isCreator: boolean;
}