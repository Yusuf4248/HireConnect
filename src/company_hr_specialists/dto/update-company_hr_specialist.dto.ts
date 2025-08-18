import { PartialType } from '@nestjs/swagger';
import { CreateCompanyHrSpecialistDto } from './create-company_hr_specialist.dto';

export class UpdateCompanyHrSpecialistDto extends PartialType(CreateCompanyHrSpecialistDto) {}
