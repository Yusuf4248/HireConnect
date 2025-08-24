import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/messages.entity';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './message.gateway';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]),FileModule],
  providers: [MessagesService, MessagesGateway],
})
export class MessagesModule {}
