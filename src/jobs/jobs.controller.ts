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
import { Job } from './entities/job.entity';
import { JobsFilterDto } from '../filters/dto/jobs-filter.dto';

@ApiTags('Jobs')
@ApiBearerAuth()
@Controller('jobs')
export class JobsController {
  jobsFilterService: any;
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
  @Roles('job_seeker', 'hr', 'admin')
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
  @Roles('job_seeker', 'hr', 'admin')
  @ApiOperation({ summary: 'Search for jobs by keyword' })
  @ApiParam({ name: 'term', description: 'Search keyword' })
  @ApiResponse({
    status: 200,
    description: 'Search results returned successfully.',
  })
  search(@Param('term') term: string) {
    return this.jobsService.search(term);
  }

  @Get('filter')
  @ApiOperation({ summary: 'Filter jobs based on multiple criteria' })
  @ApiResponse({
    status: 200,
    description: 'List of jobs matching the filter criteria',
    type: [Job],
  })
  async filterJobs(@Query() filters: JobsFilterDto): Promise<Job[]> {
    return this.jobsFilterService.filterJobs(filters);
  }

  @Get('vacancie/:hrid')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('hr', 'admin')
  @ApiOperation({ summary: 'Retrieve job postings by HR specialist ID' })
  @ApiParam({ name: 'hrid', description: 'HR Specialist ID' })
  @ApiResponse({
    status: 200,
    description: 'List of jobs posted by the specified HR specialist.',
  })
  findByHr(@Param('hrid') hrid: string) {
    return this.jobsService.findHrResumes(+hrid);
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('job_seeker', 'hr', 'admin')
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
