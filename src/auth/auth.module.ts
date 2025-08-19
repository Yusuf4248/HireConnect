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
import { OtpModule } from '../otp/otp.module';
import { GeneralAuthController } from './general/general.auth.controller';
import { GeneralAuthService } from './general/general.auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HrSpecialist } from '../hr_specialists/entities/hr_specialist.entity';
import { JobSeeker } from '../job_seekers/entities/job_seeker.entity';
import { Admin } from '../admin/entities/admin.entity';
import { Contact } from '../contacts/entities/contact.entity';
import { Otp } from '../otp/entities/otp.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HrSpecialist, JobSeeker, Admin, Contact, Otp]),
    AdminModule,
    JobSeekersModule,
    HrSpecialistsModule,
    JwtModule,
    OtpModule,
  ],
  controllers: [
    AdminAuthController,
    HrAuthController,
    JobSeekerAuthController,
    GeneralAuthController,
  ],
  providers: [
    AdminAuthService,
    HrAuthService,
    JobSeekerAuthService,
    GeneralAuthService,
  ],
})
export class AuthModule {}
