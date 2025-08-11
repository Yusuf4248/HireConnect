export class CreateCommentDto {
  chat_id: string;
  sender_id: string;
  sender_table_name: string;
  subject?: string;
  content: string;
}
