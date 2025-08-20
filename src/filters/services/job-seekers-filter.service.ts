import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobSeeker } from '../../job_seekers/entities/job_seeker.entity';
import { JobSeekersFilterDto } from '../dto/jobs-seekers-filter.dto';

@Injectable()
export class JobSeekersFilterService {
  constructor(
    @InjectRepository(JobSeeker)
    private readonly jobSeekerRepository: Repository<JobSeeker>,
  ) {}

  async filterJobSeekers(filters: JobSeekersFilterDto): Promise<JobSeeker[]> {
    const query = this.jobSeekerRepository.createQueryBuilder('jobSeeker');

    if (filters.name) {
      query.andWhere('jobSeeker.name ILIKE :name', {
        name: `%${filters.name}%`,
      });
    }

    if (filters.skills) {
      // skills may be a CSV string → split and search
      const skillsArray = filters.skills.split(',').map((s) => s.trim());
      skillsArray.forEach((skill, index) => {
        query.andWhere(`jobSeeker.skills ILIKE :skill${index}`, {
          [`skill${index}`]: `%${skill}%`,
        });
      });
    }

    if (filters.location) {
      query.andWhere('jobSeeker.location ILIKE :location', {
        location: `%${filters.location}%`,
      });
    }

    if (filters.minExperience) {
      query.andWhere('jobSeeker.experience >= :minExperience', {
        minExperience: filters.minExperience,
      });
    }

    if (filters.maxExperience) {
      query.andWhere('jobSeeker.experience <= :maxExperience', {
        maxExperience: filters.maxExperience,
      });
    }

    return query.getMany();
  }
}
