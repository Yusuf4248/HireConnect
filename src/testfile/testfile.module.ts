import { Module } from '@nestjs/common';
import { TestfileService } from './testfile.service';
import { TestfileController } from './testfile.controller';

@Module({
  controllers: [TestfileController],
  providers: [TestfileService],
})
export class TestfileModule {}
