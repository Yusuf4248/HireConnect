import { Module } from '@nestjs/common';
import { CompanyHrSpecialistsService } from './company_hr_specialists.service';
import { CompanyHrSpecialistsController } from './company_hr_specialists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyHrSpecialist } from './entities/company_hr_specialist.entity';
import { Company } from '../companies/entities/company.entity';
import { HrSpecialist } from '../hr_specialists/entities/hr_specialist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyHrSpecialist, Company, HrSpecialist]),
  ],
  controllers: [CompanyHrSpecialistsController],
  providers: [CompanyHrSpecialistsService],
})
export class CompanyHrSpecialistsModule {}
