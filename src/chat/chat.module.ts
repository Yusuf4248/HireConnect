import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { ChatsService } from './chat.service';
import { ChatsController } from './chat.controller';
import { JwtModule } from '@nestjs/jwt';
import { HrSpecialist } from '../hr_specialists/entities/hr_specialist.entity';
import { JobSeeker } from '../job_seekers/entities/job_seeker.entity';
import { JobApplication } from '../job-applications/entities/job-application.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, HrSpecialist, JobSeeker, JobApplication]),
    JwtModule,
  ],
  providers: [ChatsService],
  controllers: [ChatsController],
  exports: [ChatsService],
})
export class ChatsModule {}
