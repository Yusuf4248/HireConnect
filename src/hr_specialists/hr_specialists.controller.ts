import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HrSpecialistsService } from './hr_specialists.service';
import { CreateHrSpecialistDto } from './dto/create-hr_specialist.dto';
import { UpdateHrSpecialistDto } from './dto/update-hr_specialist.dto';

@Controller('hr-specialists')
export class HrSpecialistsController {
  constructor(private readonly hrSpecialistsService: HrSpecialistsService) {}

  @Post()
  create(@Body() createHrSpecialistDto: CreateHrSpecialistDto) {
    return this.hrSpecialistsService.create(createHrSpecialistDto);
  }

  @Get()
  findAll() {
    return this.hrSpecialistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hrSpecialistsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHrSpecialistDto: UpdateHrSpecialistDto) {
    return this.hrSpecialistsService.update(+id, updateHrSpecialistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hrSpecialistsService.remove(+id);
  }
}
