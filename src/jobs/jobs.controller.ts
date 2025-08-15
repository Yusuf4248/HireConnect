import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { JobApplication } from 'src/job-applications/entities/job-application.entity';
import { CreateJobApplicationDto } from 'src/job-applications/dto/create-job-application.dto';

@ApiTags('Jobs')
@ApiBearerAuth()
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'hr')
  @ApiOperation({ summary: 'Create a new job posting' })
  @ApiResponse({ status: 201, description: 'Job successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiBody({ type: CreateJobDto })
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('jobSeeker', 'hr')
  @ApiOperation({ summary: 'Retrieve all job postings' })
  @ApiResponse({
    status: 200,
    description: 'List of all jobs returned successfully.',
  })
  findAll() {
    return this.jobsService.findAll();
  }

  @Get('search/:term')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('job_seeker', 'hr')
  @ApiOperation({ summary: 'Search for jobs by keyword' })
  @ApiParam({ name: 'term', description: 'Search keyword' })
  @ApiResponse({
    status: 200,
    description: 'Search results returned successfully.',
  })
  search(@Param('term') term: string) {
    return this.jobsService.search(term);
  }


  @Get('filters')
  @ApiOperation({ summary: 'Get filtered jobs' })
  @ApiResponse({ status: 200, description: 'List of jobs', type: [CreateJobApplicationDto] })
  @ApiBody({ type: CreateJobApplicationDto, description: 'Filter criteria for jobs' })
  async filters(@Body() filters) {
    const { location, min_salary, max_salary, experience_level, type, work, is_remote, search, page, limit, sort_by, sort_order } = filters;
    return this.jobsService.filters({
      filters: {
        location,
        min_salary,
        max_salary,
        experience_level,
        type,
        work,
        is_remote,
        search,
      },
      pagination: { page, limit },
      sort: { sortBy: sort_by, sortOrder: sort_order },
    });
  }


  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('job_seeker', 'hr')
  @ApiOperation({ summary: 'Retrieve details of a specific job' })
  @ApiParam({ name: 'id', description: 'Job ID' })
  @ApiResponse({
    status: 200,
    description: 'Job details returned successfully.',
  })
  @ApiResponse({ status: 404, description: 'Job not found.' })
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'hr')
  @ApiOperation({ summary: 'Update an existing job posting' })
  @ApiParam({ name: 'id', description: 'Job ID' })
  @ApiBody({ type: UpdateJobDto })
  @ApiResponse({ status: 200, description: 'Job successfully updated.' })
  @ApiResponse({ status: 404, description: 'Job not found.' })
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(+id, updateJobDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'hr')
  @ApiOperation({ summary: 'Delete a job posting' })
  @ApiParam({ name: 'id', description: 'Job ID' })
  @ApiResponse({ status: 200, description: 'Job successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Job not found.' })
  remove(@Param('id') id: string) {
    return this.jobsService.remove(+id);
  }
}
