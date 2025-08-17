import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from '../../jobs/entities/job.entity';
import { JobsFilterDto } from '../dto/jobs-filter.dto';

@Injectable()
export class JobsFilterService {
  constructor(@InjectRepository(Job) private readonly repo: Repository<Job>) {}

  async filter(dto: JobsFilterDto) {
    let qb = this.repo.createQueryBuilder('job');

    if (dto.title)
      qb.andWhere('job.title ILIKE :title', { title: `%${dto.title}%` });
    if (dto.location)
      qb.andWhere('job.location ILIKE :location', {
        location: `%${dto.location}%`,
      });
    if (dto.minSalary)
      qb.andWhere('job.salary >= :min', { min: dto.minSalary });
    if (dto.maxSalary)
      qb.andWhere('job.salary <= :max', { max: dto.maxSalary });
    if (dto.employmentType)
      qb.andWhere('job.employmentType = :type', { type: dto.employmentType });
    if (dto.experienceLevel)
      qb.andWhere('job.experienceLevel = :level', {
        level: dto.experienceLevel,
      });

    return qb.getMany();
  }
}
