import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages.service';
import { CreateCommentDto } from './dto/create-comment.dto';

interface MessageData extends CreateCommentDto {
  file?: {
    buffer: Buffer;
    originalname: string;
    mimetype: string;
  };

}

@WebSocketGateway({ cors: { origin: '*' } })
export class MessagesGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() data: CreateCommentDto,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('Получено текстовое сообщение:', data);
    const message = await this.messagesService.create({ ...data, type: 'text' });
    this.server.to(`chat_${data.chat_id}`).emit(`chat_${data.chat_id}`, message);
    return message;
  }

  @SubscribeMessage('sendMessageWithFile')
  async handleSendMessageWithFile(
    @MessageBody() data: MessageData,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('Получено сообщение с файлом:', data);
    let file: Express.Multer.File | undefined;

    if (data.file) {
      file = {
        buffer: data.file.buffer,
        originalname: data.file.originalname,
        mimetype: data.file.mimetype,
      } as Express.Multer.File;
    } else {
      console.error('Файл отсутствует в данных:', data);
      throw new Error('Файл не предоставлен');
    }

    const messageType = data.type || (file ? this.getMessageType(file.mimetype) : 'text');
    const messageData = {
      ...data,
      type: messageType,
      content: data.content || '',
    };

    const message = await this.messagesService.create(messageData, file);
    this.server.to(`chat_${data.chat_id}`).emit(`chat_${data.chat_id}`, message);
    return message;
  }

  private getMessageType(mimetype: string): 'audio' | 'video' | 'image' | 'document' {
    if (mimetype.startsWith('audio/')) return 'audio';
    if (mimetype.startsWith('video/')) return 'video';
    if (mimetype.startsWith('image/')) return 'image';
    return 'document';
  }

  @SubscribeMessage('getMessages')
  async handleGetMessages(@MessageBody() chatId: number) {
    const allMessages = await this.messagesService.findAll();
    return allMessages.filter((msg) => msg.chat_id === chatId);
  }

  @SubscribeMessage('join-chat')
  handleJoinChat(
    @MessageBody() chatId: number,
    @ConnectedSocket() client: Socket,
  ): void {
    client.join(`chat_${chatId}`);
    console.log(`Client ${client.id} joined chat_${chatId}`);
  }
}