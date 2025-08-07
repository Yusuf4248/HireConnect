import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateWorkExperienceDto } from "./dto/create-work_experience.dto";
import { UpdateWorkExperienceDto } from "./dto/update-work_experience.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { WorkExperience } from "./entities/work_experience.entity";
import { Repository } from "typeorm";

@Injectable()
export class WorkExperienceService {
  constructor(
    @InjectRepository(WorkExperience)
    private readonly workExpRepo: Repository<WorkExperience>
  ) {}
  create(createWorkExperienceDto: CreateWorkExperienceDto) {
    return this.workExpRepo.save(createWorkExperienceDto);
  }

  findAll() {
    return this.workExpRepo.find();
  }

  async findOne(id: number) {
    const user = await this.workExpRepo.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateWorkExperienceDto: UpdateWorkExperienceDto) {
    try {
      // Check if job seeker exists
      const existingJobSeeker = await this.findOne(id);

      // Update the job seeker
      await this.workExpRepo.update(id, updateWorkExperienceDto);

      // Return updated job seeker
      return await this.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException("Failed to update job seeker");
    }
  }

  async remove(id: number) {
    const result = await this.workExpRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
