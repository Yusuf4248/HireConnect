import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { SkillCategoryEnums } from "../entities/skill.entity";

export class CreateSkillDto {
  @ApiProperty({
    example: "JavaScript",
    description: "The name of the skill. Must be unique.",
  })
  @IsNotEmpty({ message: "Name is required" })
  @IsString({ message: "Name must be a string" })
  @MinLength(2, { message: "Name must be at least 2 characters long" })
  @MaxLength(50, { message: "Name must be less than 50 characters" })
  name: string;

  @ApiProperty({
    example: SkillCategoryEnums.TECHNICAL,
    description: "Category of the skill",
  })
  @IsEnum(SkillCategoryEnums, {
    message: `Category must be one of: ${Object.values(SkillCategoryEnums).join(", ")}`,
  })
  @IsNotEmpty({ message: "Category is required" })
  category: SkillCategoryEnums;

  // @ApiProperty({
  //   example: true,
  //   description: "Indicates whether the skill is active or not",
  //   required: false,
  // })
  @IsOptional()
  @IsBoolean({ message: "is_active must be a boolean" })
  is_active?: boolean;
}
