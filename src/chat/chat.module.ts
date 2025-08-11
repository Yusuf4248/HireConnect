import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat.model';
import { ChatsService } from './chat.service';
import { ChatsController } from './chat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  providers: [ChatsService],
  controllers: [ChatsController],
})
export class ChatsModule {}
