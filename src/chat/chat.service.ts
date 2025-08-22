import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) { }

  async create(data: CreateChatDto) {
    const chat = this.chatRepository.create(data as any);
    return this.chatRepository.save(chat);
  }

  async findAll(): Promise<Chat[]> {
    return this.chatRepository.find({ relations: ['messages','job_application'] });
  }
  async findUserChats(role:string,id:number){
    if (role=='job_seeker'){
    return this.chatRepository.find({where:{job_seeker_id:id,}, relations:['job_application']})
    }

    if (role=='hr'){
    return this.chatRepository.find({where:{hr_id:id}, relations:['job_application']})
    }
  }
  async findOne(id: number): Promise<Chat> {

    const chat = await this.chatRepository.findOne({
      where: { id },
      relations: ['messages'],
    });
    if (!chat) throw new NotFoundException('Chat not found');
    console.log("chats :::", chat);

    return chat;
  }

  async update(id: number, data: Partial<UpdateChatDto>) {
    console.log('start service');

    const chat = await this.findOne(id);
    console.log("chats :::", chat);

    const res = await this.chatRepository.update({ id }, data as any);
    return await this.chatRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.chatRepository.delete(id);
  }
}
