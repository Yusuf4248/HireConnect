import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsBoolean, IsNumber } from "class-validator";

export class CreateJobCategoryDto {
  @ApiProperty({ example: "Backend", description: "Category name" })
  @IsString()
  name: string;

  @ApiProperty({
    example: "All Backend related jobs",
    description: "Category description",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 1,
    description: "Parent category ID",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  parent_id?: number;

  @ApiProperty({
    example: true,
    description: "Category is active or not",
    required: false,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
