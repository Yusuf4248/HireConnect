import { Module } from '@nestjs/common';
import { JobSeekerSkillService } from './job_seeker_skills.service';
import { JobSeekerSkillsController } from './job_seeker_skills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobSeekerSkill } from './entities/job_seeker_skill.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([JobSeekerSkill]), JwtModule],
  controllers: [JobSeekerSkillsController],
  providers: [JobSeekerSkillService],
})
export class JobSeekerSkillsModule {}
