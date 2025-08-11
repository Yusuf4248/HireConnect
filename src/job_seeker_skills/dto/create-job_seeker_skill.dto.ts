import { IsEnum, IsInt, IsNumber, IsOptional } from "class-validator";
import { ProficiencyLevel } from "../../common/enums/job_seeker_skills.enum";

export class CreateJobSeekerSkillDto {
  @IsNumber()
  jobSeekerId: number;

  @IsNumber()
  skillId: number;

  @IsOptional()
  @IsEnum(ProficiencyLevel)
  proficiencyLevel?: ProficiencyLevel;

  @IsOptional()
  @IsInt()
  yearsOfExperience?: number;
}
