import { Module } from '@nestjs/common';
import { JobSeekerSkillService } from './job_seeker_skills.service';
import { JobSeekerSkillsController } from './job_seeker_skills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobSeekerSkill } from './entities/job_seeker_skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobSeekerSkill])],
  controllers: [JobSeekerSkillsController],
  providers: [JobSeekerSkillService],
})
export class JobSeekerSkillsModule {}
