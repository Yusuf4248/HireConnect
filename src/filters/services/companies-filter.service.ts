import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../../companies/entities/company.entity';
import { CompaniesFilterDto } from '../dto/companies-filter.dto';

@Injectable()
export class CompaniesFilterService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async filterCompanies(filters: CompaniesFilterDto): Promise<Company[]> {
    const query = this.companyRepository.createQueryBuilder('company');

    if (filters.name) {
      query.andWhere('company.name ILIKE :name', {
        name: `%${filters.name}%`,
      });
    }

    if (filters.location) {
      query.andWhere('company.location ILIKE :location', {
        location: `%${filters.location}%`,
      });
    }

    if (filters.industry) {
      query.andWhere('company.industry ILIKE :industry', {
        industry: `%${filters.industry}%`,
      });
    }

    return query.getMany();
  }
}
