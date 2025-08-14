import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobSkillsService } from "./job_skills.service";
import { JobSkillsController } from "./job_skills.controller";
import { JobSkill } from "./entities/job_skill.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([JobSkill]), JwtModule],
  controllers: [JobSkillsController],
  providers: [JobSkillsService],
})
export class JobSkillsModule {}
