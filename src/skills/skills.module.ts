import { Module } from "@nestjs/common";
import { SkillsService } from "./skills.service";
import { SkillsController } from "./skills.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Skill } from "./entities/skill.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([Skill]), JwtModule],
  controllers: [SkillsController],
  providers: [SkillsService],
  exports: [SkillsService],
})
export class SkillsModule {}
