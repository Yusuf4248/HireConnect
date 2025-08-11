import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './chat.model';
import { Repository } from 'typeorm';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}

  async create(data: Partial<Chat>): Promise<Chat> {
    const chat = this.chatRepository.create(data);
    return this.chatRepository.save(chat);
  }

  async findAll(): Promise<Chat[]> {
    return this.chatRepository.find({ relations: ['messages'] });
  }

  async findOne(id: number): Promise<Chat> {
    
    const chat = await this.chatRepository.findOne({
      where: { id },
      relations: ['messages'],
    });
    if (!chat) throw new NotFoundException('Chat not found');
    console.log("chats :::",chat);
    
    return chat;
  }

  async update(id: number, data: Partial<Chat>) {
    console.log('start service');
    
    const chat = await this.findOne(id);
      console.log("chats :::",chat);

    const res =await this.chatRepository.update({ id }, data);
    return await this.chatRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.chatRepository.delete(id);
  }
}
