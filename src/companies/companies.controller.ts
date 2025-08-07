import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';


@Controller('companies')
export class CompaniesController {
  constructor(private readonly companyService: CompaniesService) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    return await this.companyService.createCompany(createCompanyDto);
  }

  @Get()
  async findAll() { 
    return await this.companyService.findAll();
  }

  @Get(':id')
  async findById(@Param("id") id:string) {
    return await this.companyService.findById(id);
  }

  @Patch(':id')
  async update(@Param("id") id:string ,@Body()Update:UpdateCompanyDto){
    return await this.companyService.update(Number(id),Update)
  }

  @Delete(':id')
  async delete(@Param("id") id:string){
    return await this.companyService.delete(Number(id))
  }
}