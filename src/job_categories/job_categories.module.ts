import { Module } from '@nestjs/common';
import { JobCategoriesService } from './job_categories.service';
import { JobCategoriesController } from './job_categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobCategory } from './entities/job_category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobCategory])],
  controllers: [JobCategoriesController],
  providers: [JobCategoriesService],
})
export class JobCategoriesModule {}
