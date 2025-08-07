import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsString,
  IsOptional,
  IsDateString,
  IsBoolean,
} from "class-validator";

export class CreateEducationDto {
  @ApiProperty({
    description: "ID of the related job seeker",
    example: 1,
  })
  @IsInt()
  job_seeker_id: number;

  @ApiProperty({
    example: "Harvard University",
    description: "Name of the educational institution",
  })
  @IsString()
  institution_name: string;

  @ApiProperty({
    example: "Bachelor of Engineering",
    required: false,
    description: "Degree earned",
  })
  @IsOptional()
  @IsString()
  degree?: string;

  @ApiProperty({
    example: "Software Engineering",
    required: false,
    description: "Field of study",
  })
  @IsOptional()
  @IsString()
  field_of_study?: string;

  @ApiProperty({
    example: "2020-09-01",
    required: false,
    description: "Start date of the education",
  })
  @IsOptional()
  @IsDateString()
  start_date?: string;

  @ApiProperty({
    example: "2024-06-15",
    required: false,
    description: "End date of the education",
  })
  @IsOptional()
  @IsDateString()
  end_date?: string;

  @ApiProperty({
    example: true,
    required: false,
    description: "Whether the education is current",
  })
  @IsOptional()
  @IsBoolean()
  is_current?: boolean;

  @ApiProperty({
    example: "Graduated with distinction",
    required: false,
    description: "Additional description or achievements",
  })
  @IsOptional()
  @IsString()
  description?: string;
}
