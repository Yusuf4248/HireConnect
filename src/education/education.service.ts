import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateEducationDto } from "./dto/create-education.dto";
import { UpdateEducationDto } from "./dto/update-education.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Education } from "./entities/education.entity";
import { Repository } from "typeorm";

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private readonly educationRepo: Repository<Education>
  ) {}
  async create(createEducationDto: CreateEducationDto) {
    // const jobSeeker = await this.jobSeekerService.findOne(createEducationDto.job_seeker_id)
    const newEducation = await this.educationRepo.save(createEducationDto);
    return {
      message: "New education created successfully",
      success: true,
      data: newEducation,
    };
  }

  async findAll(page: number, limit: number) {
    const [educations, total] = await this.educationRepo.findAndCount({
      relations: [],
      skip: (page - 1) * limit,
      order: { id: "ASC" },
    });
    return {
      message: "All educations",
      success: true,
      data: educations,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number) {
    const education = await this.educationRepo.findOne({
      where: { id },
      relations: [],
    });
    if (!education) {
      throw new NotFoundException(`Skill with ${id} not found`);
    }
    return {
      message: `Education with ID-${id}`,
      success: true,
      data: education,
    };
  }

  async update(id: number, updateEducationDto: UpdateEducationDto) {
    await this.findOne(id);
    await this.educationRepo.update(id, updateEducationDto);
    const updatedEducation = await this.findOne(id);

    return {
      message: `ID-${id} education data updated`,
      success: true,
      data: updatedEducation,
    };
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.educationRepo.delete(id);

    return {
      message: `Education with id-${id} deleted`,
      success: true,
    };
  }
}
