import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@WebSocketGateway({ cors: true })
export class MessagesGateway {
  constructor(private readonly messagesService: MessagesService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Yangi xabar yuborish
  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() data: CreateCommentDto,
    @ConnectedSocket() client: Socket,
  ) {
    // DB ga yozish
    const message = await this.messagesService.create(data);
    // Shu chat ichidagi barcha foydalanuvchilarga tarqatish
    this.server.emit(`chat_${data.chat_id}`, message);
    return message;
  }

  // Chat bo‘yicha xabarlarni olish
  @SubscribeMessage('getMessages')
  async handleGetMessages(@MessageBody() chatId: number) {
    const allMessages = await this.messagesService.findAll();
    return allMessages.filter(msg => msg.chat_id === chatId);
  }
}
