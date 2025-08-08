import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ChatsService } from './chat.service';
import { Chat } from './entities/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) { }

  @Post()
  create(@Body() data: Partial<CreateChatDto>) {
    return this.chatsService.create(data);
  }

  @Get()
  findAll() {
    return this.chatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatsService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: Partial<UpdateChatDto>) {
    console.log('controller');

    return this.chatsService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatsService.remove(id);
  }
}
