import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

interface JobFilters {
  location?: string;
  min_salary?: number;
  max_salary?: number;
  experience_level?: string;
  type?: string;
  work?: string;
  is_remote?: string;
  search?: string;
}

interface Pagination {
  page: number;
  limit: number;
}

interface Sort {
  sortBy: string;
  sortOrder: 'ASC' | 'DESC';
}

interface FindAllOptions {
  filters: JobFilters;
  pagination: Pagination;
  sort: Sort;
}

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) { }

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const job = this.jobRepository.create(createJobDto);
    return this.jobRepository.save(job);
  }
  findAll(): Promise<Job[]> {
    return this.jobRepository.find({ relations: ["category"] });
  }

async filters({ filters, pagination, sort }: FindAllOptions): Promise<{ items: Job[]; meta: any }> {
 const { page, limit } = pagination;
    const queryBuilder = this.jobRepository
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.company', 'company')
      .leftJoinAndSelect('job.category', 'category');

    if (filters.location) {
      queryBuilder.andWhere('job.location ILIKE :location', { location: `%${filters.location}%` });
    }
    if (filters.min_salary) {
      queryBuilder.andWhere('job.salary_min >= :salaryMin', { salaryMin: filters.min_salary });
    }
    if (filters.max_salary) {
      queryBuilder.andWhere('job.max_salary <= :salaryMax', { salaryMax: filters.max_salary });
    }
    if (filters.experience_level) {
      queryBuilder.andWhere('job.experience_level = :experienceLevel', { experienceLevel: filters.experience_level });
    }
    if (filters.type) {
      queryBuilder.andWhere('job.type = :type', { type: filters.type });
    }
    if (filters.work) {
      queryBuilder.andWhere('job.work = :work', { work: filters.work });
    }
    if (filters.is_remote) {
      queryBuilder.andWhere('job.is_remote = :is_remote', { is_remote: filters.is_remote });
    }
    if (filters.search) {
      queryBuilder.andWhere(
        '(job.title ILIKE :search OR job.description ILIKE :search OR company.name ILIKE :search)',
        { search: `%${filters.search}%` },
      );
    }

    queryBuilder.orderBy(`job.${sort.sortBy}`, sort.sortOrder).skip((page - 1) * limit).take(limit);

    const [items, total] = await queryBuilder.getManyAndCount();
    return { items, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: number): Promise<Job> {
    const job = await this.jobRepository.findOne({
      where: { id },
      relations: ['company', 'category'],
    });
    if (!job) throw new NotFoundException(`Job with id ${id} not found`);
    return job;
  }

  async search(term: string): Promise<Job[]> {
    return this.jobRepository
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.company', 'company')
      .leftJoinAndSelect('job.category', 'category')
      .where('job.title ILIKE :term', { term: `%${term}%` })
      .orWhere('job.description ILIKE :term', { term: `%${term}%` })
      .orWhere('job.location ILIKE :term', { term: `%${term}%` })
      .orWhere('company.name ILIKE :term', { term: `%${term}%` })
      .orderBy('job.created_at', 'DESC')
      .getMany();
  }

  async update(id: number, updateJobDto: UpdateJobDto): Promise<Job> {
    const job = await this.findOne(id);
    Object.assign(job, updateJobDto);
    return this.jobRepository.save(job);
  }

  async remove(id: number): Promise<{ message: string; id: number }> {
    const job = await this.findOne(id);
    await this.jobRepository.remove(job);
    return { message: `Job with id ${id} removed`, id };
  }
}