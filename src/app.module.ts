import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobSkillsModule } from './job_skills/job_skills.module';
import { JobCategoriesModule } from './job_categories/job_categories.module';
import { JobsModule } from './jobs/jobs.module';
import { JobSeekerSkillsModule } from './job_seeker_skills/job_seeker_skills.module';
import { UsersModule } from './users/users.module';
import { JobSeekersModule } from './job_seekers/job_seekers.module';
import { HrSpecialistsModule } from './hr_specialists/hr_specialists.module';
import { WorkExperienceModule } from './work_experience/work_experience.module';
import { SkillsModule } from './skills/skills.module';
import { ContactsModule } from './contacts/contacts.module';
import { EducationModule } from './education/education.module';
import { JobApplicationsModule } from './job-applications/job-applications.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
      autoLoadEntities: true,
      dropSchema: false
    }),
    JobSkillsModule,
    JobCategoriesModule,
    JobsModule,
    JobSeekerSkillsModule,
    UsersModule,
    JobSeekersModule,
    HrSpecialistsModule,
    WorkExperienceModule,
    SkillsModule,
    ContactsModule,
    EducationModule,
    JobApplicationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
