import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateJobSeekerDto } from './dto/create-job_seeker.dto';
import { UpdateJobSeekerDto } from './dto/update-job_seeker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JobSeeker } from './entities/job_seeker.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class JobSeekersService {
  constructor(
    @InjectRepository(JobSeeker)
    private readonly jobSeeker: Repository<JobSeeker>,
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
}
