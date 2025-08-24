import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/messages.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { FileService } from '../file/file.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private readonly fileService: FileService,
  ) {}

  private getContentType(fileName: string, mimetype: string): 'audio' | 'video' | 'image' | 'document' {
    if (mimetype.startsWith('audio/')) return 'audio';
    if (mimetype.startsWith('video/')) return 'video';
    if (mimetype.startsWith('image/')) return 'image';

    const extension = fileName.split('.').pop()?.toLowerCase();
    const audioExtensions = ['mp3', 'wav', 'ogg', 'webm', 'm4a', 'aac', 'opus'];
    const videoExtensions = ['mp4', 'webm', 'avi', 'mov', 'mkv', '3gp', 'flv'];
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];

    if (extension && audioExtensions.includes(extension)) return 'audio';
    if (extension && videoExtensions.includes(extension)) return 'video';
    if (extension && imageExtensions.includes(extension)) return 'image';

    return 'document';
  }

  async create(data: Partial<CreateCommentDto> & { type?: string }, file?: Express.Multer.File) {
    console.log('Создание сообщения:', { data, file: file ? { originalname: file.originalname, mimetype: file.mimetype } : null });

    const messageData: Partial<Message> = {
      chat_id: +data.chat_id!,
      sender_id: +data.sender_id!,
      sender_table_name: data.sender_table_name,
      content: data.content || null,
      file: null,
      type: data.type as any || 'text',
      is_read: false,
    };

    if (file) {
      if (!file.originalname || !file.mimetype) {
        throw new BadRequestException('Некорректные данные файла');
      }

      const fileName = await this.fileService.saveImage(file.buffer, file.originalname);
      messageData.file = this.getFileUrl(fileName);
      messageData.type = data.type as any || this.getContentType(file.originalname, file.mimetype);
      if (['audio', 'video', 'image'].includes(messageData.type as any)) {
        messageData.content = null; // Медиа-сообщения не содержат текст
      }
      console.log('Файл сохранен:', messageData.file);
    }

    const msg = this.messageRepository.create(messageData);
    const savedMessage = await this.messageRepository.save(msg);
    console.log('Сообщение сохранено в БД:', savedMessage);
    return savedMessage;
  }

  getFileUrl(fileName: string): string {
    return `http://localhost:3000/public/images/${fileName}`;
  }

  async findAll(): Promise<Message[]> {
    return this.messageRepository.find({
      relations: ['chat'],
      order: { created_at: 'ASC' },
    });
  }

  async findOne(id: number) {
    const message = await this.messageRepository.findOne({
      where: { chat_id: id },
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