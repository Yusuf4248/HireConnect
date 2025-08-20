import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

import { JobsFilterDto } from './dto/jobs-filter.dto';
import { JobSeekersFilterDto } from './dto/jobs-seekers-filter.dto';
import { CompaniesFilterDto } from './dto/companies-filter.dto';
import { CategoriesFilterDto } from './dto/categories-filter.dto';
import { SkillsFilterDto } from './dto/skills-filter.dto';

import { JobsFilterService } from './services/jobs-filter.service';
import { JobSeekersFilterService } from './services/job-seekers-filter.service';
import { CompaniesFilterService } from './services/companies-filter.service';
import { CategoriesFilterService } from './services/categories-filter.service';
import { SkillsFilterService } from './services/skills-filter.service';

@ApiTags('Filters')
@Controller('filters')
export class FiltersController {
  constructor(
    private readonly jobsFilterService: JobsFilterService,
    private readonly jobSeekersFilterService: JobSeekersFilterService,
    private readonly companiesFilterService: CompaniesFilterService,
    private readonly categoriesFilterService: CategoriesFilterService,
    private readonly skillsFilterService: SkillsFilterService,
  ) {}

  @Get('jobs')
  @ApiOperation({
    summary: 'Filter jobs',
    description:
      'Retrieve a list of jobs based on optional filter parameters such as title, location, salary, employment type, or experience level.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of filtered jobs successfully returned.',
  })
  filterJobs(@Query() dto: JobsFilterDto) {
    return this.jobsFilterService.filter(dto);
  }

  @Get('jobseekers')
  @ApiOperation({
    summary: 'Filter job seekers',
    description:
      'Retrieve a list of job seekers based on skills, experience, or other filter parameters.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of filtered job seekers successfully returned.',
  })
  filterJobSeekers(@Query() dto: JobSeekersFilterDto) {
    return this.jobSeekersFilterService.filterJobSeekers(dto);
  }

  @Get('companies')
  @ApiOperation({
    summary: 'Filter companies',
    description:
      'Retrieve companies based on optional filters such as name, industry, or location.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of filtered companies successfully returned.',
  })
  filterCompanies(@Query() dto: CompaniesFilterDto) {
    return this.companiesFilterService.filterCompanies(dto);
  }

  @Get('categories')
  @ApiOperation({
    summary: 'Filter categories',
    description:
      'Retrieve available job categories based on filter parameters like name or type.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of filtered categories successfully returned.',
  })
  filterCategories(@Query() dto: CategoriesFilterDto) {
    return this.categoriesFilterService.filterCategories(dto);
  }

  @Get('skills')
  @ApiOperation({
    summary: 'Filter skills',
    description:
      'Retrieve skills based on optional filters such as name or category.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of filtered skills successfully returned.',
  })
  filterSkills(@Query() dto: SkillsFilterDto) {
    return this.skillsFilterService.filterSkills(dto);
  }
}
