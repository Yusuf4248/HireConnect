import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateJobApplicationDto } from "./dto/create-job-application.dto";
import { UpdateJobApplicationDto } from "./dto/update-job-application.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { JobApplication } from "./entities/job-application.entity";
import { Repository } from "typeorm";

@Injectable()
export class JobApplicationsService {
  constructor(
    @InjectRepository(JobApplication)
    private readonly jobApplicationRepo: Repository<JobApplication>
  ) {}
  async create(createJobApplicationDto: CreateJobApplicationDto) {
    const newJobApplication = await this.jobApplicationRepo.save(
      createJobApplicationDto
    );

    return {
      message: "New job application created successfully",
      success: true,
      data: newJobApplication,
    };
  }

  async findAll(page: number, limit: number) {
    const [jobApplications, total] = await this.jobApplicationRepo.findAndCount(
      {
        relations: [],
        skip: (page - 1) * limit,
        order: { id: "ASC" },
      }
    );
    return {
      message: "All job applications",
      success: true,
      data: jobApplications,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number) {
    const jobApplication = await this.jobApplicationRepo.findOne({
      where: { id },
      relations: [],
    });
    if (!jobApplication) {
      throw new NotFoundException(`Job application with ${id} not found`);
    }
    return {
      message: `Job application with ID-${id}`,
      success: true,
      data: jobApplication,
    };
  }

  async update(id: number, updateJobApplicationDto: UpdateJobApplicationDto) {
    await this.findOne(id);
    await this.jobApplicationRepo.update(id, updateJobApplicationDto);
    const updatedJobApplication = await this.findOne(id);

    return {
      message: `ID-${id} job application data updated`,
      success: true,
      data: updatedJobApplication,
    };
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.jobApplicationRepo.delete(id);

    return {
      message: `Job application with id-${id} deleted`,
      success: true,
    };
  }
}
