import { PartialType } from '@nestjs/swagger';
import { CreateTestfileDto } from './create-testfile.dto';

export class UpdateTestfileDto extends PartialType(CreateTestfileDto) {}
