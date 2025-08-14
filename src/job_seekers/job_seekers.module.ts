import { Module } from '@nestjs/common';
import { JobSeekersService } from './job_seekers.service';
import { JobSeekersController } from './job_seekers.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { JobSeeker } from './entities/job_seeker.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([JobSeeker]), JwtModule],
  controllers: [JobSeekersController],
  providers: [JobSeekersService],
  exports: [JobSeekersService],
})
export class JobSeekersModule {}
