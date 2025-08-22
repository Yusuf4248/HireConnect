// filters.module.ts
import { Module } from '@nestjs/common';
import { FiltersController } from './filters.controller';
import { JobsFilterService } from './jobs-filter.service';

@Module({
  controllers: [FiltersController],
  providers: [JobsFilterService],
  exports: [JobsFilterService], 
})
export class FiltersModule {}
