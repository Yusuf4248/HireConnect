import { IsBoolean, IsEnum, IsNumber, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SkillLevel } from "../../common/enums/job_skills.enum";

export class CreateJobSkillDto {
  @ApiProperty({ example: 1, description: "ID of the job" })
  @IsNumber()
  job_id: number;

  @ApiProperty({ example: 5, description: "ID of the skill" })
  @IsNumber()
  skill_id: number;

  @ApiPropertyOptional({
    example: true,
    description: "Is the skill required for the job",
  })
  @IsOptional()
  @IsBoolean()
  is_required?: boolean;

  @ApiPropertyOptional({
    enum: SkillLevel,
    example: SkillLevel.INTERMEDIATE,
    description: "Minimum skill level required",
  })
  @IsOptional()
  @IsEnum(SkillLevel)
  minimum_level?: SkillLevel;
}
