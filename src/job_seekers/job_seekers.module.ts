import { Module } from '@nestjs/common';
import { JobSeekersService } from './job_seekers.service';
import { JobSeekersController } from './job_seekers.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { JobSeeker } from './entities/job_seeker.entity';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([JobSeeker]), JwtModule,MailModule],
  controllers: [JobSeekersController],
  providers: [JobSeekersService],
  exports: [JobSeekersService],
})
export class JobSeekersModule {}
