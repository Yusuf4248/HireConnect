import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Chat ID associated with the message',
    type: String,
    example: '123',
  })
  @IsString()
  chat_id: string;

  @ApiProperty({ description: 'Sender ID', type: String, example: '456' })
  @IsString()
  sender_id: string;

  @ApiProperty({ description: 'Send type', type: String, example: '456' })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Table name of the sender',
    type: String,
    example: 'users',
  })
  @IsString()
  sender_table_name: string;

  @ApiProperty({
    description: 'Message content',
    type: String,
    example: 'This is the message content.',
  })
  @IsString()
  content: string;
}
