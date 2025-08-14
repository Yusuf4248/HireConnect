import { Module } from '@nestjs/common';
import { HrSpecialistsService } from './hr_specialists.service';
import { HrSpecialistsController } from './hr_specialists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HrSpecialist } from './entities/hr_specialist.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([HrSpecialist]), JwtModule],
  controllers: [HrSpecialistsController],
  providers: [HrSpecialistsService],
  exports: [HrSpecialistsService],
})
export class HrSpecialistsModule {}
