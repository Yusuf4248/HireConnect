import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from '../jobs/entities/job.entity';
import { JobsFilterDto } from './dto/jobs-filter.dto';

@Injectable()
export class JobsFilterService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  async filterJobs(filters: JobsFilterDto): Promise<Job[]> {
    const query = this.jobRepository
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.company', 'company')
      .leftJoinAndSelect('job.category', 'category')
      .leftJoinAndSelect('job.job_skills', 'jobSkill');

    // 1. Experience Level
    if (filters.experience_level) {
      query.andWhere('job.experience_level = :experience_level', {
        experience_level: filters.experience_level,
      });
    }

    // 2. Employment Type
    if (filters.employment_type) {
      query.andWhere('job.employment_type = :employment_type', {
        employment_type: filters.employment_type,
      });
    }

    // 3. Currency
    if (filters.currency) {
      query.andWhere('job.currency = :currency', {
        currency: filters.currency,
      });
    }

    // 4. Salary range
    if (filters.min_salary) {
      query.andWhere('job.min_salary >= :min_salary', {
        min_salary: filters.min_salary,
      });
    }
    if (filters.max_salary) {
      query.andWhere('job.max_salary <= :max_salary', {
        max_salary: filters.max_salary,
      });
    }

    // 5. Location
    if (filters.location) {
      query.andWhere('job.location ILIKE :location', {
        location: `%${filters.location}%`,
      });
    }

    // 6. Work Days
    if (filters.work_days) {
      query.andWhere('job.work_days = :work_days', {
        work_days: filters.work_days,
      });
    }

    // 7. Category
    if (filters.category_id) {
      query.andWhere('job.category_id = :category_id', {
        category_id: filters.category_id,
      });
    }

    // 8. Company
    if (filters.company_id) {
      query.andWhere('job.company_id = :company_id', {
        company_id: filters.company_id,
      });
    }

    // 9. Skills (array)
    if (filters.skills && filters.skills.length > 0) {
      query.andWhere('jobSkill.skill_id IN (:...skills)', {
        skills: filters.skills,
      });
    }

    return query.getMany();
  }
}
