import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from '../../skills/entities/skill.entity';
import { SkillsFilterDto } from '../dto/skills-filter.dto';

@Injectable()
export class SkillsFilterService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async filterSkills(filters: SkillsFilterDto): Promise<Skill[]> {
    const query = this.skillRepository.createQueryBuilder('skill');

    if (filters.name) {
      query.andWhere('skill.name ILIKE :name', { name: `%${filters.name}%` });
    }

    return query.getMany();
  }
}
