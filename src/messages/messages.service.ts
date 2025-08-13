import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/messages.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async create(data: Partial<CreateCommentDto>): Promise<Message> {
    const msg = this.messageRepository.create(data as any);
    return this.messageRepository.save(msg as any);
  }

  async findAll(): Promise<Message[]> {
    return this.messageRepository.find({ relations: ['chat'] });
  }

  async findOne(id: number): Promise<Message> {
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: ['chat'],
    });
    if (!message) throw new NotFoundException('Message not found');
    return message;
  }

  async update(id: number, data: Partial<UpdateCommentDto>): Promise<Message> {
    const msg = await this.findOne(id);
    Object.assign(msg, data);
    return this.messageRepository.save(msg);
  }

  async remove(id: string): Promise<void> {
    await this.messageRepository.delete(id);
  }
}
