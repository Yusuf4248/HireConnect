import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FiltersController } from './filters.controller';
import { JobsFilterService } from './jobs-filter.service';
import { Job } from '../jobs/entities/job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job])], 
  controllers: [FiltersController],
  providers: [JobsFilterService],
  exports: [JobsFilterService],
})
export class FiltersModule {}
