import { PartialType } from '@nestjs/swagger';
import { CreateJobSeekerSkillDto } from './create-job_seeker_skill.dto';

export class UpdateJobSeekerSkillDto extends PartialType(CreateJobSeekerSkillDto) {}
