import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateHrSpecialistDto } from "./dto/create-hr_specialist.dto";
import { UpdateHrSpecialistDto } from "./dto/update-hr_specialist.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { HrSpecialist } from "./entities/hr_specialist.entity";
import { Repository } from "typeorm";

@Injectable()
export class HrSpecialistsService {
  constructor(
    @InjectRepository(HrSpecialist)
    private readonly hrSpecRepo: Repository<HrSpecialist>
  ) {}
  create(createHrSpecialistDto: CreateHrSpecialistDto) {
    return this.hrSpecRepo.save(createHrSpecialistDto);
  }

  findAll() {
    return this.hrSpecRepo.find();
  }

  async findOne(id: number) {
    const user = await this.hrSpecRepo.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateHrSpecialistDto: UpdateHrSpecialistDto) {
   try {
         // Check if job seeker exists
         const existingJobSeeker = await this.findOne(id);
   
         // Update the job seeker
         await this.hrSpecRepo.update(id, updateHrSpecialistDto);
   
         // Return updated job seeker
         return await this.findOne(id);
       } catch (error) {
         if (error instanceof NotFoundException) {
           throw error;
         }
         throw new BadRequestException("Failed to update job seeker");
       }
  }

  async remove(id: number) {
   const result = await this.hrSpecRepo.delete(id);

   if (result.affected === 0) {
     throw new NotFoundException(`User with ID ${id} not found`);
   }
  }
}
