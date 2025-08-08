import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('resumes')
@Controller('resumes')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new resume' })
  @ApiBody({ type: CreateResumeDto })
  @ApiResponse({ status: 201, description: 'Resume created successfully', type: CreateResumeDto })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body() dto: CreateResumeDto) {
    return this.resumeService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all resumes' })
  @ApiResponse({ status: 200, description: 'List of all resumes', type: [CreateResumeDto] })
  findAll() {
    return this.resumeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a resume by ID' })
  @ApiParam({ name: 'id', description: 'Resume ID', type: String })
  @ApiResponse({ status: 200, description: 'Resume found', type: CreateResumeDto })
  @ApiResponse({ status: 404, description: 'Resume not found' })
  findOne(@Param('id') id: string) {
    return this.resumeService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a resume by ID' })
  @ApiParam({ name: 'id', description: 'Resume ID', type: String })
  @ApiBody({ type: UpdateResumeDto })
  @ApiResponse({ status: 200, description: 'Resume updated successfully', type: CreateResumeDto })
  @ApiResponse({ status: 404, description: 'Resume not found' })
  update(@Param('id') id: string, @Body() dto: UpdateResumeDto) {
    return this.resumeService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a resume by ID' })
  @ApiParam({ name: 'id', description: 'Resume ID', type: String })
  @ApiResponse({ status: 200, description: 'Resume deleted successfully' })
  @ApiResponse({ status: 404, description: 'Resume not found' })
  remove(@Param('id') id: string) {
    return this.resumeService.remove(+id);
  }
}