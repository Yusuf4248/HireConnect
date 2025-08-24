import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { HrSpecialist } from '../hr_specialists/entities/hr_specialist.entity';
import { JobSeeker } from '../job_seekers/entities/job_seeker.entity';
import { JobApplication } from '../job-applications/entities/job-application.entity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    @InjectRepository(HrSpecialist)
    private hrSpecialistRepository: Repository<HrSpecialist>,
    @InjectRepository(JobSeeker)
    private jobSeekerRepository: Repository<JobSeeker>,
    @InjectRepository(JobApplication)
    private jobApplicationRepository: Repository<JobApplication>,
  ) {}

  async create(dto: CreateChatDto) {
    const { application_id, hr_id, job_seeker_id } = dto;

    const job_application = await this.jobApplicationRepository.findOne({
      where: { id: application_id },
    });
    if (!job_application)
      throw new NotFoundException('Job application not found');

    const hr = await this.hrSpecialistRepository.findOne({
      where: { id: hr_id },
    });
    if (!hr) throw new NotFoundException('Hr specialist not found');

    const job_seeker = await this.jobSeekerRepository.findOne({
      where: { id: job_seeker_id },
    });
    if (!job_seeker) throw new NotFoundException('Job seeker not found');

    const chat = await this.chatRepository.save({
      ...dto,
      job_application,
      hr_specialist: hr,
      job_seeker,
    });

    return chat;
  }

  async findAll(): Promise<Chat[]> {
    return this.chatRepository.find({ relations: ['messages','job_application'] });
  }

  async findUserChats(role: string, id: number) {
    if (role == 'job_seeker') {
      return this.chatRepository.find({ where: { job_seeker: { id } } });
    }

    if (role == 'hr') {
      return this.chatRepository.find({ where: { hr_specialist: { id } } });
  }
  }

  async findOne(id: number): Promise<Chat> {
    const chat = await this.chatRepository.findOne({
      where: { id },
      relations: ['messages'],
    });
    if (!chat) throw new NotFoundException('Chat not found');
    return chat;
  }

  async update(id: number, data: Partial<UpdateChatDto>) {
    const chat = await this.findOne(id);

    const res = await this.chatRepository.update({ id }, data as any);
    return await this.chatRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.chatRepository.delete(id);
  }
}
