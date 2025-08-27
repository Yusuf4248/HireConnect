import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateJobApplicationDto } from "./dto/create-job-application.dto";
import { UpdateJobApplicationDto } from "./dto/update-job-application.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { JobApplication } from "./entities/job-application.entity";
import { In, Repository } from "typeorm";
import { ChatsService } from "src/chat/chat.service";
import { JobsService } from "src/jobs/jobs.service";


interface JobApplicationFilters {
  status?: string[];
  job_id?: number;
  job_seeker_id?: number;
  applied_at_from?: Date;
  applied_at_to?: Date;
  search?: string;
}

interface Pagination {
  page: number;
  limit: number;
}

interface Sort {
  sortBy: string;
  sortOrder: 'ASC' | 'DESC';
}

interface FindAllOptions {
  filters: JobApplicationFilters;
  pagination: Pagination;
  sort: Sort;
}

@Injectable()
export class JobApplicationsService {
  constructor(
    @InjectRepository(JobApplication)
    private readonly jobApplicationRepo: Repository<JobApplication>,
    private readonly jobService:JobsService,

  private readonly chatsService: ChatsService
  ) { }
  async create(createJobApplicationDto: CreateJobApplicationDto) {
    const newJobApplication = await this.jobApplicationRepo.save(
      createJobApplicationDto
    );
    // const newChat = await this.chatsService.create()

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


async findHrApplications(hrid: number) {
  const getHrByResumes = await this.jobService.findHrResumes(hrid);

  const jobApplications = await this.jobApplicationRepo.find({
    where: { job_id: In(getHrByResumes.map(job => job.id)) },
    relations: ['job', 'job_seeker', 'chat'],
  });

  return jobApplications;
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




  async filters({ filters, pagination, sort }: FindAllOptions) {
    const { page, limit } = pagination;
    const queryBuilder = this.jobApplicationRepo
      .createQueryBuilder('ja')
      .leftJoinAndSelect('ja.job', 'job')
      .leftJoinAndSelect('ja.job_seeker', 'job_seeker')
      .leftJoinAndSelect('ja.chat', 'chat');

    if (filters.status?.length) {
      queryBuilder.andWhere('ja.status IN (:...status)', { status: filters.status });
    }
    if (filters.job_id) {
      queryBuilder.andWhere('ja.job_id = :jobId', { jobId: filters.job_id });
    }
    if (filters.job_seeker_id) {
      queryBuilder.andWhere('ja.job_seeker_id = :jobSeekerId', { jobSeekerId: filters.job_seeker_id });
    }
    if (filters.applied_at_from) {
      queryBuilder.andWhere('ja.applied_at >= :appliedAtFrom', { appliedAtFrom: filters.applied_at_from });
    }
    if (filters.applied_at_to) {
      queryBuilder.andWhere('ja.applied_at <= :appliedAtTo', { appliedAtTo: filters.applied_at_to });
    }
    if (filters.search) {
      queryBuilder.andWhere('(ja.cover_letter ILIKE :search OR ja.notes ILIKE :search)', { search: `%${filters.search}%` });
    }

    queryBuilder.orderBy(`ja.${sort.sortBy}`, sort.sortOrder).skip((page - 1) * limit).take(limit);

    const [items, total] = await queryBuilder.getManyAndCount();
    return {
      message: 'Filtered job applications',
      success: true,
      data: items,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }
}
