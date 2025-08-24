import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { JobsFilterDto } from './dto/jobs-filter.dto';
import { JobsFilterService } from './jobs-filter.service';
import { Job } from '../jobs/entities/job.entity';

@ApiTags('Filters')
@Controller('filters')
export class FiltersController {
  constructor(private readonly jobsFilterService: JobsFilterService) {}

  @Get('jobs')
  @ApiOkResponse({
    description: 'Returns a list of jobs that match the provided filters',
    type: [Job],
  })
  async filterJobs(@Query() filters: JobsFilterDto): Promise<Job[]> {
    return this.jobsFilterService.filterJobs(filters);
  }
}
