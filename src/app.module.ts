import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobSkillsModule } from './job_skills/job_skills.module';
import { JobCategoriesModule } from './job_categories/job_categories.module';
import { JobsModule } from './jobs/jobs.module';
import { JobSeekerSkillsModule } from './job_seeker_skills/job_seeker_skills.module';
import { JobSeekersModule } from './job_seekers/job_seekers.module';
import { HrSpecialistsModule } from './hr_specialists/hr_specialists.module';
import { WorkExperienceModule } from './work_experience/work_experience.module';
import { SkillsModule } from './skills/skills.module';
import { ContactsModule } from './contacts/contacts.module';
import { EducationModule } from './education/education.module';
import { JobApplicationsModule } from './job-applications/job-applications.module';
import { ChatsModule } from './chat/chat.module';
import { MessagesModule } from './messages/messages.module';
import { CompaniesModule } from './companies/companies.module';
import { AdminModule } from './admin/admin.module';
import { ResumeModule } from './resume/resume.module';
import { AuthModule } from './auth/auth.module';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './common/logger/winston.logger';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    WinstonModule.forRoot(winstonConfig),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
      dropSchema: false,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '15m' },
    }),
    JobSkillsModule,
    ChatsModule,
    CompaniesModule,
    MessagesModule,
    AdminModule,
    ResumeModule,
    JobCategoriesModule,
    JobsModule,
    JobSeekerSkillsModule,
    JobSeekersModule,
    HrSpecialistsModule,
    WorkExperienceModule,
    SkillsModule,
    ContactsModule,
    EducationModule,
    JobApplicationsModule,
    AuthModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
