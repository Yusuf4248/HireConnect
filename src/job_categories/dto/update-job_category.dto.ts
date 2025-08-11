import { PartialType } from '@nestjs/swagger';
import { CreateJobCategoryDto } from './create-job_category.dto';

export class UpdateJobCategoryDto extends PartialType(CreateJobCategoryDto) {}
