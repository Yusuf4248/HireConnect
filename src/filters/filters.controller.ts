import { Controller, Get, Query } from '@nestjs/common';
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
  filterJobs(@Query() dto: JobsFilterDto) {
    return this.jobsFilterService.filter(dto);
  }

  @Get('jobseekers')
  filterJobSeekers(@Query() dto: JobSeekersFilterDto) {
    return this.jobSeekersFilterService.filterJobSeekers(dto);
  }

  @Get('companies')
  filterCompanies(@Query() dto: CompaniesFilterDto) {
    return this.companiesFilterService.filterCompanies(dto);
  }

  @Get('categories')
  filterCategories(@Query() dto: CategoriesFilterDto) {
    return this.categoriesFilterService.filterCategories(dto);
  }

  @Get('skills')
  filterSkills(@Query() dto: SkillsFilterDto) {
    return this.skillsFilterService.filterSkills(dto);
  }
}
