import { Module } from "@nestjs/common";
import { JobApplicationsService } from "./job-applications.service";
import { JobApplicationsController } from "./job-applications.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobApplication } from "./entities/job-application.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([JobApplication]), JwtModule],
  controllers: [JobApplicationsController],
  providers: [JobApplicationsService],
})
export class JobApplicationsModule {}
