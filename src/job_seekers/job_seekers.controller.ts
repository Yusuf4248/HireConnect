import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobSeekersService } from './job_seekers.service';
import { CreateJobSeekerDto } from './dto/create-job_seeker.dto';
import { UpdateJobSeekerDto } from './dto/update-job_seeker.dto';

@Controller('job-seekers')
export class JobSeekersController {
  constructor(private readonly jobSeekersService: JobSeekersService) {}

  @Post()
  create(@Body() createJobSeekerDto: CreateJobSeekerDto) {
    return this.jobSeekersService.create(createJobSeekerDto);
  }

  @Get()
  findAll() {
    return this.jobSeekersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobSeekersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobSeekerDto: UpdateJobSeekerDto) {
    return this.jobSeekersService.update(+id, updateJobSeekerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobSeekersService.remove(+id);
  }
}
