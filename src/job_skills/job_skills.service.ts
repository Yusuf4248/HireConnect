import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JobSkill } from "./entities/job_skill.entity";
import { CreateJobSkillDto } from "./dto/create-job_skill.dto";
import { UpdateJobSkillDto } from "./dto/update-job_skill.dto";

@Injectable()
export class JobSkillsService {
  constructor(
    @InjectRepository(JobSkill)
    private readonly jobSkillRepository: Repository<JobSkill>
  ) {}

  async create(createJobSkillDto: CreateJobSkillDto): Promise<JobSkill> {
    const jobSkill = this.jobSkillRepository.create(createJobSkillDto);
    return this.jobSkillRepository.save(jobSkill);
  }

  async findAll(): Promise<JobSkill[]> {
    return this.jobSkillRepository.find();
  }

  async findOne(id: number): Promise<JobSkill> {
    const jobSkill = await this.jobSkillRepository.findOne({ where: { id } });
    if (!jobSkill) {
      throw new NotFoundException(`JobSkill with id ${id} not found`);
    }
    return jobSkill;
  }

  async update(
    id: number,
    updateJobSkillDto: UpdateJobSkillDto
  ): Promise<JobSkill> {
    const jobSkill = await this.findOne(id);
    Object.assign(jobSkill, updateJobSkillDto);
    return this.jobSkillRepository.save(jobSkill);
  }

  async remove(id: number): Promise<{ id: number; message: string }> {
    const jobSkill = await this.findOne(id);
    await this.jobSkillRepository.remove(jobSkill);
    return {
      id,
      message: `JobSkill with id ${id} has been removed`,
    };
  }
}
