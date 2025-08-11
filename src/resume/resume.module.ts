import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resume } from './entities/resume.entity';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([Resume]),FileModule],
  controllers: [ResumeController],
  providers: [ResumeService],
})
export class ResumeModule {}
