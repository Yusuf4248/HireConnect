import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JobSeekersService } from './job_seekers.service';
import { CreateJobSeekerDto } from './dto/create-job_seeker.dto';
import { UpdateJobSeekerDto } from './dto/update-job_seeker.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { IsJobSeekerGuard } from '../common/guards/is.job.seeker.guard';

@ApiTags('Job Seekers')
@ApiBearerAuth()
@Controller('job-seekers')
@UseGuards(AuthGuard, RolesGuard) // butun controller uchun umumiy guard
export class JobSeekersController {
  constructor(private readonly jobSeekersService: JobSeekersService) {}

  @Post()
  @Roles('job_seeker', 'admin') // faqat job seeker roliga ruxsat
  @UseGuards(IsJobSeekerGuard)
  @ApiOperation({ summary: 'Create a new job seeker' })
  @ApiCreatedResponse({
    description: 'The job seeker has been successfully created',
    type: CreateJobSeekerDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiBody({ type: CreateJobSeekerDto })
  create(@Body() createJobSeekerDto: CreateJobSeekerDto) {
    return this.jobSeekersService.create(createJobSeekerDto);
  }

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: 'Get all job seekers' })
  @ApiOkResponse({
    description: 'List of all job seekers',
    type: [CreateJobSeekerDto],
  })
  findAll() {
    return this.jobSeekersService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'job_seeker')
  @ApiOperation({ summary: 'Get a job seeker by ID' })
  @ApiOkResponse({
    description: 'The job seeker with the requested ID',
    type: CreateJobSeekerDto,
  })
  @ApiNotFoundResponse({ description: 'Job seeker not found' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID of the job seeker to retrieve',
  })
  findOne(@Param('id') id: string) {
    return this.jobSeekersService.findOne(+id);
  }

  @Patch(':id')
  @Roles('job_seeker', 'admin')
  @UseGuards(IsJobSeekerGuard)
  @ApiOperation({ summary: 'Update a job seeker' })
  @ApiOkResponse({
    description: 'The job seeker has been successfully updated',
    type: UpdateJobSeekerDto,
  })
  @ApiNotFoundResponse({ description: 'Job seeker not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID of the job seeker to update',
  })
  @ApiBody({ type: UpdateJobSeekerDto })
  update(
    @Param('id') id: string,
    @Body() updateJobSeekerDto: UpdateJobSeekerDto,
  ) {
    return this.jobSeekersService.update(+id, updateJobSeekerDto);
  }

  @Delete(':id')
  @Roles('job_seeker', 'admin')
  @UseGuards(IsJobSeekerGuard)
  @ApiOperation({ summary: 'Delete a job seeker' })
  @ApiOkResponse({
    description: 'The job seeker has been successfully deleted',
  })
  @ApiNotFoundResponse({ description: 'Job seeker not found' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID of the job seeker to delete',
  })
  remove(@Param('id') id: string) {
    return this.jobSeekersService.remove(+id);
  }
}
