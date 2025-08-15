import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobSkillsService } from './job_skills.service';
import { CreateJobSkillDto } from './dto/create-job_skill.dto';
import { UpdateJobSkillDto } from './dto/update-job_skill.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Job Skills')
@ApiBearerAuth()
@Controller('job-skills')
export class JobSkillsController {
  constructor(private readonly jobSkillsService: JobSkillsService) {}

  @Post()
  create(@Body() createJobSkillDto: CreateJobSkillDto) {
    return this.jobSkillsService.create(createJobSkillDto);
  }

  @Get()
  findAll() {
    return this.jobSkillsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobSkillsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJobSkillDto: UpdateJobSkillDto,
  ) {
    return this.jobSkillsService.update(+id, updateJobSkillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobSkillsService.remove(+id);
  }
}
