import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobCategory } from '../../job_categories/entities/job_category.entity';
import { CategoriesFilterDto } from '../dto/categories-filter.dto';

@Injectable()
export class CategoriesFilterService {
  constructor(
    @InjectRepository(JobCategory)
    private readonly categoryRepository: Repository<JobCategory>,
  ) {}

  async filterCategories(filters: CategoriesFilterDto): Promise<JobCategory[]> {
    const query = this.categoryRepository.createQueryBuilder('category');

    if (filters.name) {
      query.andWhere('category.name ILIKE :name', {
        name: `%${filters.name}%`,
      });
    }

    return query.getMany();
  }
}
