
import { Module } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module';
import { JobSeekersModule } from '../job_seekers/job_seekers.module';
import { HrSpecialistsModule } from '../hr_specialists/hr_specialists.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminAuthController } from './admin/admin.auth.controller';
import { HrAuthController } from './hr/hr.auth.controller';
import { JobSeekerAuthController } from './job_seeker/job-seeker.auth.controller';
import { AdminAuthService } from './admin/admin.auth.service';
import { HrAuthService } from './hr/hr.auth.service';
import { JobSeekerAuthService } from './job_seeker/job-seeker.auth.service';

@Module({
  imports: [AdminModule, JobSeekersModule, HrSpecialistsModule, JwtModule],
  controllers: [AdminAuthController, HrAuthController, JobSeekerAuthController],
  providers: [AdminAuthService, HrAuthService, JobSeekerAuthService],
})
export class AuthModule {}

