import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { JwtModule } from '@nestjs/jwt';
import { FileModule } from '../file/file.module';

@Module({
  imports:[TypeOrmModule.forFeature([Company]), JwtModule, FileModule],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}