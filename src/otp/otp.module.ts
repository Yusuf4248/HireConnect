import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { HrSpecialist } from '../hr_specialists/entities/hr_specialist.entity';
import { JobSeeker } from '../job_seekers/entities/job_seeker.entity';
import { MailModule } from '../mail/mail.module';
import { Admin } from '../admin/entities/admin.entity';
import { Contact } from '../contacts/entities/contact.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Otp, HrSpecialist, JobSeeker, Admin, Contact]),
    MailModule,
  ],
  controllers: [OtpController],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
