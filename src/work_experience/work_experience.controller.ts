import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkExperienceService } from './work_experience.service';
import { CreateWorkExperienceDto } from './dto/create-work_experience.dto';
import { UpdateWorkExperienceDto } from './dto/update-work_experience.dto';

@Controller('work-experience')
export class WorkExperienceController {
  constructor(private readonly workExperienceService: WorkExperienceService) {}

  @Post()
  create(@Body() createWorkExperienceDto: CreateWorkExperienceDto) {
    return this.workExperienceService.create(createWorkExperienceDto);
  }

  @Get()
  findAll() {
    return this.workExperienceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workExperienceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkExperienceDto: UpdateWorkExperienceDto) {
    return this.workExperienceService.update(+id, updateWorkExperienceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workExperienceService.remove(+id);
  }
}
