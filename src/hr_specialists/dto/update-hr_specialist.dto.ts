import { PartialType } from '@nestjs/swagger';
import { CreateHrSpecialistDto } from './create-hr_specialist.dto';

export class UpdateHrSpecialistDto extends PartialType(CreateHrSpecialistDto) {}
