import { IsString, IsInt } from 'class-validator';

export class CreateChatDto {
  @IsString()
  chat_name: string;

  @IsInt()
  user_id: number;

  @IsInt()
  worker_id: number;
}