import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JobSkillsService } from './job_skills.service';
import { CreateJobSkillDto } from './dto/create-job_skill.dto';
import { UpdateJobSkillDto } from './dto/update-job_skill.dto';
import { ApiTags, ApiOperation, ApiResponse,ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags('Job Skills')
@ApiBearerAuth()
@Controller('job-skills')
@UseGuards(AuthGuard, RolesGuard)

export class JobSkillsController {
  constructor(private readonly jobSkillsService: JobSkillsService) {}

  @Post()
  @Roles('hr')
  @ApiOperation({ summary: 'Create a new job skill' })
  @ApiResponse({ status: 201, description: 'Job skill successfully created' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body() createJobSkillDto: CreateJobSkillDto) {
    return this.jobSkillsService.create(createJobSkillDto);
  }

  @Get()
  @Roles('hr', 'job_seeker')
  @ApiOperation({ summary: 'Retrieve all job skills' })
  @ApiResponse({ status: 200, description: 'List of all job skills' })
  findAll() {
    return this.jobSkillsService.findAll();
  }

  @Get(':id')
  @Roles('hr', 'job_seeker')
  @ApiOperation({ summary: 'Retrieve a job skill by ID' })
  @ApiResponse({ status: 200, description: 'Job skill details' })
  @ApiResponse({ status: 404, description: 'Job skill not found' })
  findOne(@Param('id') id: string) {
    return this.jobSkillsService.findOne(+id);
  }

  @Patch(':id')
  @Roles('hr')
  @ApiOperation({ summary: 'Update a job skill by ID' })
  @ApiResponse({ status: 200, description: 'Job skill successfully updated' })
  @ApiResponse({ status: 404, description: 'Job skill not found' })
  update(
    @Param('id') id: string,
    @Body() updateJobSkillDto: UpdateJobSkillDto,
  ) {
    return this.jobSkillsService.update(+id, updateJobSkillDto);
  }

  @Delete(':id')
  @Roles('hr')
  @ApiOperation({ summary: 'Delete a job skill by ID' })
  @ApiResponse({ status: 200, description: 'Job skill successfully deleted' })
  @ApiResponse({ status: 404, description: 'Job skill not found' })
  remove(@Param('id') id: string) {
    return this.jobSkillsService.remove(+id);
  }
}
