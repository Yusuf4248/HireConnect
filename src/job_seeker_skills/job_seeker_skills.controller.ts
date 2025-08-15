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
import { JobSeekerSkillService } from './job_seeker_skills.service';
import { CreateJobSeekerSkillDto } from './dto/create-job_seeker_skill.dto';
import { UpdateJobSeekerSkillDto } from './dto/update-job_seeker_skill.dto';

import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles-auth.decorator';

@ApiTags('Job Seeker Skills')
@ApiBearerAuth()
@Controller('job-seeker-skills')
@UseGuards(AuthGuard, RolesGuard)
export class JobSeekerSkillsController {
  constructor(private readonly jobSeekerSkillsService: JobSeekerSkillService) {}

  @Post()
  @Roles('job_seeker', 'admin')
  @ApiOperation({ summary: 'Create a new job seeker skill' })
  @ApiResponse({
    status: 201,
    description: 'The skill has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createJobSeekerSkillDto: CreateJobSeekerSkillDto) {
    return this.jobSeekerSkillsService.create(createJobSeekerSkillDto);
  }

  @Get()
  @Roles('job_seeker', 'hr', 'admin')
  @ApiOperation({ summary: 'Get all job seeker skills' })
  @ApiResponse({ status: 200, description: 'List of all job seeker skills.' })
  findAll() {
    return this.jobSeekerSkillsService.findAll();
  }

  @Get(':id')
  @Roles('job_seeker', 'hr', 'admin')
  @ApiOperation({ summary: 'Get a job seeker skill by ID' })
  @ApiResponse({ status: 200, description: 'The skill details.' })
  @ApiResponse({ status: 404, description: 'Skill not found.' })
  findOne(@Param('id') id: string) {
    return this.jobSeekerSkillsService.findOne(+id);
  }

  @Patch(':id')
  @Roles('job_seeker', 'admin')
  @ApiOperation({ summary: 'Update a job seeker skill by ID' })
  @ApiResponse({
    status: 200,
    description: 'The skill has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Skill not found.' })
  update(
    @Param('id') id: string,
    @Body() updateJobSeekerSkillDto: UpdateJobSeekerSkillDto,
  ) {
    return this.jobSeekerSkillsService.update(+id, updateJobSeekerSkillDto);
  }

  @Delete(':id')
  @Roles('job_seeker', 'admin')
  @ApiOperation({ summary: 'Delete a job seeker skill by ID' })
  @ApiResponse({
    status: 200,
    description: 'The skill has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Skill not found.' })
  remove(@Param('id') id: string) {
    return this.jobSeekerSkillsService.remove(+id);
  }
}
