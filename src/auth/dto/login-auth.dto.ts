import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({
    example: 'admin@gmail.com',
    description: "admin's email",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Admin123!',
    description: "admin's password",
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
