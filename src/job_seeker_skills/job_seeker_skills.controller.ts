import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobSeekerSkillService } from './job_seeker_skills.service';
import { CreateJobSeekerSkillDto } from './dto/create-job_seeker_skill.dto';
import { UpdateJobSeekerSkillDto } from './dto/update-job_seeker_skill.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Job Seeker Skills')
@Controller('job-seeker-skills')
export class JobSeekerSkillsController {
  constructor(private readonly jobSeekerSkillsService: JobSeekerSkillService) {}

  @Post()
  create(@Body() createJobSeekerSkillDto: CreateJobSeekerSkillDto) {
    return this.jobSeekerSkillsService.create(createJobSeekerSkillDto);
  }

  @Get()
  findAll() {
    return this.jobSeekerSkillsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobSeekerSkillsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobSeekerSkillDto: UpdateJobSeekerSkillDto) {
    return this.jobSeekerSkillsService.update(+id, updateJobSeekerSkillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobSeekerSkillsService.remove(+id);
  }
}
