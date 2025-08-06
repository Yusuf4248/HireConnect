import { Injectable } from "@nestjs/common";
import { CreateJobSeekerDto } from "./dto/create-job_seeker.dto";
import { UpdateJobSeekerDto } from "./dto/update-job_seeker.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { JobSeeker } from "./entities/job_seeker.entity";
import { Repository } from "typeorm";

@Injectable()
export class JobSeekersService {
  constructor(
    @InjectRepository(JobSeeker)
    private readonly jobSeeker: Repository<JobSeeker>
  ) {}
  create(createJobSeekerDto: CreateJobSeekerDto) {
    return "This action adds a new jobSeeker";
  }

  findAll() {
    return `This action returns all jobSeekers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobSeeker`;
  }

  update(id: number, updateJobSeekerDto: UpdateJobSeekerDto) {
    return `This action updates a #${id} jobSeeker`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobSeeker`;
  }
}
