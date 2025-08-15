import { Module } from "@nestjs/common";
import { EducationService } from "./education.service";
import { EducationController } from "./education.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Education } from "./entities/education.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([Education]), JwtModule],
  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationModule {}
