import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { JwtModule } from '@nestjs/jwt';
import { FileModule } from '../file/file.module';
import { HrSpecialist } from '../hr_specialists/entities/hr_specialist.entity';
import { CompanyHrSpecialist } from '../company_hr_specialists/entities/company_hr_specialist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company, HrSpecialist, CompanyHrSpecialist]),
    JwtModule,
    FileModule,
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
