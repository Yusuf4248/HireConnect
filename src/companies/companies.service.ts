import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { FileService } from '../file/file.service';
import { CompanyStatus } from '../common/enums/company.enum';
import { CompanyHrSpecialist } from '../company_hr_specialists/entities/company_hr_specialist.entity';
import { HrSpecialist } from '../hr_specialists/entities/hr_specialist.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(CompanyHrSpecialist)
    private companyHrSpecialistRepository: Repository<CompanyHrSpecialist>,
    @InjectRepository(HrSpecialist)
    private hrSpecialistRepository: Repository<HrSpecialist>,
    private fileService: FileService,
  ) {}

  async createCompany(
    createCompanyDto: CreateCompanyDto,
    image: Express.Multer.File,
    hr_id: number,
  ): Promise<Company> {
    const company = this.companyRepository.create(createCompanyDto);
    const fileName = await this.fileService.saveImage(
      image.buffer,
      image.originalname,
    );
    company.logo_url = `/public/images/${fileName}`;
    company.hr_id = hr_id;
    return await this.companyRepository.save(company);
  }

  async findAll(page: number, limit: number) {
    const [results, total] = await this.companyRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
    });
    return {
      data: results,
      total,
      page,
      limit,
    };
  }

  async findById(id: number) {
    const company = await this.companyRepository.findOne({ where: { id } });
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    return company;
  }

  async update(id: number, update: UpdateCompanyDto) {
    await this.companyRepository.update({ id }, update);
    return await this.companyRepository.findOneBy({ id });
  }

  async delete(id: number) {
    const res = await this.companyRepository.delete(id);
    return res;
  }

  async updateCompanyStatus(id: number, status: CompanyStatus) {
    const company = await this.findById(id);
    const hr = await this.hrSpecialistRepository.findOne({
      where: { id: company.hr_id },
    });
    if (!hr) {
      throw new NotFoundException(`HR not found`);
    }
    if (status === CompanyStatus.VERIFIED) {
      company.status = status;
      const company_hr_spec = await this.companyHrSpecialistRepository.save({
        company,
        hrSpecialist: hr,
        is_company_admin: true,
        is_active: true,
      });

      await this.companyRepository.save(company);
      return {
        message: `Company status changed to ${status} and company-hr-specialist created`,
        company_hr_spec,
      };
    } else if (status === CompanyStatus.NOT_VERIFIED) {
      company.status = status;
      await this.companyRepository.save(company);

      return {
        message: `Company status changed to ${status}`,
      };
    }
  }
}
