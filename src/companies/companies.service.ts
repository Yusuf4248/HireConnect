import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';


@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) { }

  async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = this.companyRepository.create(createCompanyDto);
    return await this.companyRepository.save(company);
  }

  async findAll(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  async findById(id) {
    return await this.companyRepository.findOne({ where: { id } })
  }

  async update(id: number, update: UpdateCompanyDto) {
    console.log('Update payload:', update); // 👈 Buni qo‘shing

    await this.companyRepository.update({ id }, update);
    return await this.companyRepository.findOneBy({ id });
  }

  async delete(id) {
    const res = await this.companyRepository.delete(id)
    return res
  }

} 