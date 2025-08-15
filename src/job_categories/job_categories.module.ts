import { Module } from '@nestjs/common';
import { JobCategoriesService } from './job_categories.service';
import { JobCategoriesController } from './job_categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobCategory } from './entities/job_category.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([JobCategory]), JwtModule],
  controllers: [JobCategoriesController],
  providers: [JobCategoriesService],
})
export class JobCategoriesModule {}
