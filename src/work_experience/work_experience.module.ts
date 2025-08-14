import { Module } from '@nestjs/common';
import { WorkExperienceService } from './work_experience.service';
import { WorkExperienceController } from './work_experience.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkExperience } from './entities/work_experience.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([WorkExperience]), JwtModule],
  controllers: [WorkExperienceController],
  providers: [WorkExperienceService],
})
export class WorkExperienceModule {}
