import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resume } from './entities/resume.entity';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { FileService } from 'src/file/file.service';

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume)
    private resumeRepository: Repository<Resume>,
    private readonly fileService: FileService,
  ) {}

 async create(dto: CreateResumeDto, file: Express.Multer.File): Promise<Resume> {
  console.log('sttart in service');
  
    const fileName = await this.fileService.saveImage(file.buffer, file.originalname);
    const filePath = `/public/images/${fileName}`;

    console.log(filePath,"service");
    

    const resume = this.resumeRepository.create({
      ...dto,
      file_name: file.originalname,
      file_path: filePath,
      file_size: file.size,
      mime_type: file.mimetype,
      is_primary: Boolean(dto.is_primary) ?? false,
    });

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
