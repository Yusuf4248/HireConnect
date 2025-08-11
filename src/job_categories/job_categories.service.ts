import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateJobCategoryDto } from "./dto/create-job_category.dto";
import { UpdateJobCategoryDto } from "./dto/update-job_category.dto";
import { JobCategory } from "./entities/job_category.entity";

@Injectable()
export class JobCategoriesService {
  constructor(
    @InjectRepository(JobCategory)
    private readonly jobCategoryRepository: Repository<JobCategory>
  ) {}

  async create(createDto: CreateJobCategoryDto): Promise<JobCategory> {
    const category = this.jobCategoryRepository.create(createDto);
    return this.jobCategoryRepository.save(category);
  }

  async findAll(): Promise<JobCategory[]> {
    return this.jobCategoryRepository.find({
      relations: ["parent"],
    });
  }

  async findOne(id: number): Promise<JobCategory> {
    const category = await this.jobCategoryRepository.findOne({
      where: { id },
      relations: ["parent"],
    });

    if (!category) {
      throw new NotFoundException(`JobCategory with id ${id} not found`);
    }

    return category;
  }

  async update(
    id: number,
    updateDto: UpdateJobCategoryDto
  ): Promise<JobCategory> {
    const category = await this.findOne(id);
    const updated = Object.assign(category, updateDto);
    return this.jobCategoryRepository.save(updated);
  }

  async remove(id: number): Promise<{ id: number; message: string }> {
    const category = await this.findOne(id);
    await this.jobCategoryRepository.remove(category);
    return {
      id,
      message: `JobCategory with id ${id} has been removed`,
    };
  }
}
