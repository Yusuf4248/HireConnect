import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateSkillDto } from "./dto/create-skill.dto";
import { UpdateSkillDto } from "./dto/update-skill.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Skill } from "./entities/skill.entity";
import { Repository } from "typeorm";

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill) private readonly skillRepo: Repository<Skill>
  ) {}
  async create(createSkillDto: CreateSkillDto) {
    const newSkill = await this.skillRepo.save(createSkillDto);
    return {
      message: "New skill successfully created",
      success: true,
      data: newSkill,
    };
  }

  async findAll(page: number, limit: number) {
    const [skills, total] = await this.skillRepo.findAndCount({
      relations: [],
      skip: (page - 1) * limit,
      order: { id: "ASC" },
    });
    return {
      message: "All skills",
      success: true,
      data: skills,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number) {
    const skill = await this.skillRepo.findOne({
      where: { id },
      relations: [],
    });
    if (!skill) {
      throw new NotFoundException(`Skill with ${id} not found`);
    }
    return {
      message: `Skill with ID-${id}`,
      success: true,
      data: skill,
    };
  }

  async update(id: number, updateSkillDto: UpdateSkillDto) {
    await this.findOne(id);
    if (updateSkillDto?.name) {
      const isSkillWithNewNameExist = await this.skillRepo.findOne({
        where: { name: updateSkillDto.name },
        order: { id: "ASC" },
      });
      if (isSkillWithNewNameExist)
        throw new BadRequestException("Skill with this name already exists");
    }
    await this.skillRepo.update(id, updateSkillDto);
    const updatedSkill = await this.findOne(id);

    return {
      message: `ID-${id} skill data updated`,
      success: true,
      data: updatedSkill,
    };
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.skillRepo.delete(id);

    return {
      message: `Skill with id-${id} deleted`,
      success: true,
    };
  }

  async findSkillByName(name: string) {
    const skill = await this.skillRepo.findOne({
      where: { name },
    });
    if (!skill) {
      throw new NotFoundException("Skill not found");
    }
    return {
      message: `Skill with name-${name}`,
      success: true,
      data: skill,
    };
  }
}
