import { Module } from "@nestjs/common";
import { JobApplicationsService } from "./job-applications.service";
import { JobApplicationsController } from "./job-applications.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobApplication } from "./entities/job-application.entity";
import { JwtModule } from "@nestjs/jwt";
import { ChatsModule } from "src/chat/chat.module";
import { JobsModule } from "src/jobs/jobs.module";

@Module({
  imports: [TypeOrmModule.forFeature([JobApplication]), JwtModule,ChatsModule,JobsModule],
  controllers: [JobApplicationsController],
  providers: [JobApplicationsService],
})
export class JobApplicationsModule {}
