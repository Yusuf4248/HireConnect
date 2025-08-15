import { IsEnum, IsInt, IsNumber, IsOptional } from "class-validator";
import { ProficiencyLevel } from "../../common/enums/job_seeker_skills.enum";

export class CreateJobSeekerSkillDto {
  @IsNumber()
  job_seeker_id: number;

  @IsNumber()
  skill_id: number;



  @IsOptional()
  @IsEnum(ProficiencyLevel)
  proficiency_level?: ProficiencyLevel;

  @IsOptional()
  @IsInt()
  years_of_experience?: number;
}
