import { Injectable } from '@nestjs/common';
import { CreateTestfileDto } from './dto/create-testfile.dto';
import { UpdateTestfileDto } from './dto/update-testfile.dto';

@Injectable()
export class TestfileService {
  create(createTestfileDto: CreateTestfileDto) {
    return 'This action adds a new testfile';
  }

  findAll() {
    return `This action returns all testfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testfile`;
  }

  update(id: number, updateTestfileDto: UpdateTestfileDto) {
    return `This action updates a #${id} testfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} testfile`;
  }
}
