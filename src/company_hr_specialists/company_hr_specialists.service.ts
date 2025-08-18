import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyHrSpecialistDto } from './dto/create-company_hr_specialist.dto';
import { UpdateCompanyHrSpecialistDto } from './dto/update-company_hr_specialist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyHrSpecialist } from './entities/company_hr_specialist.entity';
import { Repository } from 'typeorm';
import { HrSpecialist } from '../hr_specialists/entities/hr_specialist.entity';
import { Company } from '../companies/entities/company.entity';

@Injectable()
export class CompanyHrSpecialistsService {
  constructor(
    @InjectRepository(CompanyHrSpecialist)
    private readonly companyHrSpecRepo: Repository<CompanyHrSpecialist>,
    @InjectRepository(HrSpecialist)
    private readonly hrSpecRepo: Repository<HrSpecialist>,
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
  ) {}
  async create(createCompanyHrSpecialistDto: CreateCompanyHrSpecialistDto) {
    const { company_id, hr_specialist_id } = createCompanyHrSpecialistDto;
    const company = await this.companyRepo.findOne({
      where: { id: company_id },
    });
    if (!company) {
      throw new NotFoundException(`Company not found`);
    }

    const hrSpec = await this.hrSpecRepo.findOne({
      where: { id: hr_specialist_id },
    });
    if (!hrSpec) {
      throw new NotFoundException(`HR specialist not found`);
    }

    const company_hr_specialist = await this.companyHrSpecRepo.save({
      company,
      hrSpecialist: hrSpec,
    });

    return company_hr_specialist;
  }

  async findAll() {
    return this.companyHrSpecRepo.find();
  }

  async findOne(id: number) {
    const company_hr_specialist = await this.companyHrSpecRepo.findOne({
      where: { id },
      relations: ['company', 'hrSpecialist'],
    });
    if (!company_hr_specialist) {
      throw new NotFoundException('Company hr specialist not found');
    }
    return company_hr_specialist;
  }

  async update(
    id: number,
    updateCompanyHrSpecialistDto: UpdateCompanyHrSpecialistDto,
  ) {
    const { company_id, hr_specialist_id } = updateCompanyHrSpecialistDto;
    const company_hr_specialist = await this.findOne(id);
    const company = await this.companyRepo.findOne({
      where: { id: company_id },
    });
    if (!company) {
      throw new NotFoundException(`Company not found`);
    }

    const hrSpec = await this.hrSpecRepo.findOne({
      where: { id: hr_specialist_id },
    });
    if (!hrSpec) {
      throw new NotFoundException(`HR specialist not found`);
    }

    company_hr_specialist.company = company;
    company_hr_specialist.hrSpecialist = hrSpec;
    return this.companyHrSpecRepo.save(company_hr_specialist);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.companyHrSpecRepo.delete(id);

    return {
      message: 'Company HR specialist deleted',
    };
  }
}
