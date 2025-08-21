import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { FileService } from '../file/file.service';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    private fileService: FileService,
  ) {}

  async createCompany(
    createCompanyDto: CreateCompanyDto,
    image: Express.Multer.File,
  ): Promise<Company> {
    const company = this.companyRepository.create(createCompanyDto);
    const fileName = await this.fileService.saveImage(
      image.buffer,
      image.originalname,
    );
    company.logo_url = fileName;
    return await this.companyRepository.save(company);
  }

  async findAll(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  async findById(id: number) {
    return await this.companyRepository.findOne({ where: { id } });
  }

  async update(id: number, update: UpdateCompanyDto) {
    await this.companyRepository.update({ id }, update);
    return await this.companyRepository.findOneBy({ id });
  }

  async delete(id: number) {
    const res = await this.companyRepository.delete(id);
    return res;
  }
}
