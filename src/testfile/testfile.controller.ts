import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestfileService } from './testfile.service';
import { CreateTestfileDto } from './dto/create-testfile.dto';
import { UpdateTestfileDto } from './dto/update-testfile.dto';

@Controller('testfile')
export class TestfileController {
  constructor(private readonly testfileService: TestfileService) {}

  @Post()
  create(@Body() createTestfileDto: CreateTestfileDto) {
    return this.testfileService.create(createTestfileDto);
  }

  @Get()
  findAll() {
    return this.testfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testfileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestfileDto: UpdateTestfileDto) {
    return this.testfileService.update(+id, updateTestfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testfileService.remove(+id);
  }
}
