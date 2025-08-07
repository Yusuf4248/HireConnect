import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resume } from './entities/resume.entity';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume)
    private resumeRepository: Repository<Resume>,
  ) {}

  async create(dto: CreateResumeDto) {
    const resume = this.resumeRepository.create(dto);
    return await this.resumeRepository.save(resume);
  }

  async findAll() {
    return this.resumeRepository.find();
  }

  async findOne(id: number) {
    return this.resumeRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateResumeDto) {
    await this.resumeRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.resumeRepository.delete(id);
  }
}
