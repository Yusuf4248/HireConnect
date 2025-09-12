import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateJobSeekerDto } from './dto/create-job_seeker.dto';
import { UpdateJobSeekerDto } from './dto/update-job_seeker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JobSeeker } from './entities/job_seeker.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';
import * as uuid from "uuid"

@Injectable()
export class JobSeekersService {
  constructor(
    @InjectRepository(JobSeeker)
    private readonly jobSeeker: Repository<JobSeeker>,
    private readonly mailService: MailService,
  ) {}

  async create(createJobSeekerDto: CreateJobSeekerDto) {
    const hashedPassword = await bcrypt.hash(
      createJobSeekerDto.password_hash,
      7,
    );

    const user = this.jobSeeker.create({
      ...createJobSeekerDto,
      password_hash: hashedPassword,
    });
    const token = uuid.v4()
    try {
      console.log('Sending email to:', user.email);
      // await this.mailService.sendActivationLink(user,token,user.first_name);
    } catch (error) {
      console.error('SendMail error:', error);
      throw new ServiceUnavailableException('Email yuborishda xatolik');
    }

    return this.jobSeeker.save(user);
  }

  findAll() {
    return this.jobSeeker.find();
  }

  async findOne(id: number) {
    const user = await this.jobSeeker.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Jobsekker with ID ${id} not found`);
    }
    return user;
  }

  async update(
    id: number,
    updateJobSeekerDto: UpdateJobSeekerDto,
  ): Promise<JobSeeker> {
    try {
      // Check if job seeker exists
      const existingJobSeeker = await this.findOne(id);

      // Update the job seeker
      await this.jobSeeker.update(id, updateJobSeekerDto);

      // Return updated job seeker
      return await this.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to update job seeker');
    }
  }

  async remove(id: number) {
    const result = await this.jobSeeker.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async updateTokenHash(id: number, hash: string) {
    await this.jobSeeker.update(id, { refersh_token: hash });
  }

  async findByEmail(email: string) {
    return this.jobSeeker.findOneBy({ email });
  }
}
