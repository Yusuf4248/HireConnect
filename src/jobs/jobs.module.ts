import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { JwtModule } from '@nestjs/jwt';
import { JobsFilterService } from '../filters/jobs-filter.service';

@Module({
  imports: [TypeOrmModule.forFeature([Job]), JwtModule],
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsFilterService],
})
export class JobsModule {}
