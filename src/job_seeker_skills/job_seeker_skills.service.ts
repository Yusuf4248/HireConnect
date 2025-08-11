import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JobSeekerSkill } from "./entities/job_seeker_skill.entity";
import { CreateJobSeekerSkillDto } from "./dto/create-job_seeker_skill.dto";
import { UpdateJobSeekerSkillDto } from "./dto/update-job_seeker_skill.dto";

@Injectable()
export class JobSeekerSkillService {
  constructor(
    @InjectRepository(JobSeekerSkill)
    private readonly repo: Repository<JobSeekerSkill>
  ) {}

  async create(dto: CreateJobSeekerSkillDto) {
    const created = this.repo.create(dto);
    return this.repo.save(created);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException("Job seeker skill not found");
    return found;
  }

  async update(id: number, dto: UpdateJobSeekerSkillDto) {
    const updated = await this.repo.preload({ id, ...dto });
    if (!updated) throw new NotFoundException("Job seeker skill not found");
    return this.repo.save(updated);
  }

  async remove(id: number) {
    const found = await this.findOne(id);
    return this.repo.remove(found);
  }
}
