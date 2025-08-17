// filters/filters.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { Job } from '../jobs/entities/job.entity';
import { JobSeeker } from '../job_seekers/entities/job_seeker.entity';
import { Company } from '../companies/entities/company.entity';
import { JobCategory } from '../job_categories/entities/job_category.entity';
import { HrSpecialist } from '../hr_specialists/entities/hr_specialist.entity';
import { Skill } from '../skills/entities/skill.entity';

// Services
import { JobsFilterService } from './services/jobs-filter.service';
import { JobSeekersFilterService } from './services/job-seekers-filter.service';
import { CompaniesFilterService } from './services/companies-filter.service';
import { CategoriesFilterService } from './services/categories-filter.service';
import { SkillsFilterService } from './services/skills-filter.service';

// Controller
import { FiltersController } from './filters.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Job,
      JobSeeker,
      Company,
      JobCategory,
      HrSpecialist,
      Skill,
    ]),
  ],
  controllers: [FiltersController],
  providers: [
    JobsFilterService,
    JobSeekersFilterService,
    CompaniesFilterService,
    CategoriesFilterService,
    SkillsFilterService,
  ],
  exports: [
    JobsFilterService,
    JobSeekersFilterService,
    CompaniesFilterService,
    CategoriesFilterService,
    SkillsFilterService,
  ],
})
export class FiltersModule {}
