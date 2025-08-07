import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobCategoriesService } from './job_categories.service';
import { CreateJobCategoryDto } from './dto/create-job_category.dto';
import { UpdateJobCategoryDto } from './dto/update-job_category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Job Categories")
@Controller('job-categories')
export class JobCategoriesController {
  constructor(private readonly jobCategoriesService: JobCategoriesService) {}

  @Post()
  create(@Body() createJobCategoryDto: CreateJobCategoryDto) {
    return this.jobCategoriesService.create(createJobCategoryDto);
  }

  @Get()
  findAll() {
    return this.jobCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobCategoryDto: UpdateJobCategoryDto) {
    return this.jobCategoriesService.update(+id, updateJobCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobCategoriesService.remove(+id);
  }
}
