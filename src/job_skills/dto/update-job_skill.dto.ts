import { PartialType } from '@nestjs/swagger';
import { CreateJobSkillDto } from './create-job_skill.dto';

export class UpdateJobSkillDto extends PartialType(CreateJobSkillDto) {}
