import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './messages.model';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async create(data: Partial<Message>): Promise<Message> {
    const msg = this.messageRepository.create(data);
    return this.messageRepository.save(msg);
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

  async update(id: number, data: Partial<Message>): Promise<Message> {
    const msg = await this.findOne(id);
    Object.assign(msg, data);
    return this.messageRepository.save(msg);
  }

  async remove(id: string): Promise<void> {
    await this.messageRepository.delete(id);
  }
}
