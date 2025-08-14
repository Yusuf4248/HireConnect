import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { ChatsService } from './chat.service';
import { ChatsController } from './chat.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Chat]), JwtModule],
  providers: [ChatsService],
  controllers: [ChatsController],
})
export class ChatsModule { }
