import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobSkillsModule } from './job_skills/job_skills.module';
import { JobCategoriesModule } from './job_categories/job_categories.module';
import { JobsModule } from './jobs/jobs.module';
import { JobSeekerSkillsModule } from './job_seeker_skills/job_seeker_skills.module';

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
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
      dropSchema: false,
    }),
    JobSkillsModule,
    JobCategoriesModule,
    JobsModule,
    JobSeekerSkillsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
