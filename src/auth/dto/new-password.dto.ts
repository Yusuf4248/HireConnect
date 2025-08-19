import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class NewPasswordDto {
  @ApiProperty({
    example: 'NewP@ssw0rd456',
    description: 'New password of the user',
  })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'NewP@ssw0rd456',
    description: 'Confirm new password (must match password)',
  })
  @IsNotEmpty()
  confirm_password: string;
}
