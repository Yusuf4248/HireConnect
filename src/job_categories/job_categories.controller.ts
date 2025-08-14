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
import { JobCategoriesService } from './job_categories.service';
import { CreateJobCategoryDto } from './dto/create-job_category.dto';
import { UpdateJobCategoryDto } from './dto/update-job_category.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags('Job Categories')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('job-categories')
export class JobCategoriesController {
  constructor(private readonly jobCategoriesService: JobCategoriesService) {}

  @Roles('admin')
  @Post()
  @ApiOperation({ summary: 'Create a new job category (Admin only)' })
  @ApiResponse({
    status: 201,
    description: 'Job category created successfully.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Only admins can create job categories.',
  })
  create(@Body() createJobCategoryDto: CreateJobCategoryDto) {
    return this.jobCategoriesService.create(createJobCategoryDto);
  }

  @Get()
  @Roles('admin', 'hr', 'job_seeker')
  @ApiOperation({ summary: 'Get all job categories (Admin, HR, Job Seeker)' })
  @ApiResponse({ status: 200, description: 'List of all job categories.' })
  findAll() {
    return this.jobCategoriesService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'hr', 'job_seeker')
  @ApiOperation({
    summary: 'Get a single job category by ID (Admin, HR, Job Seeker)',
  })
  @ApiResponse({ status: 200, description: 'Job category details.' })
  @ApiResponse({ status: 404, description: 'Job category not found.' })
  findOne(@Param('id') id: string) {
    return this.jobCategoriesService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update a job category (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Job category updated successfully.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Only admins can update job categories.',
  })
  @ApiResponse({ status: 404, description: 'Job category not found.' })
  update(
    @Param('id') id: string,
    @Body() updateJobCategoryDto: UpdateJobCategoryDto,
  ) {
    return this.jobCategoriesService.update(+id, updateJobCategoryDto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a job category (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Job category deleted successfully.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Only admins can delete job categories.',
  })
  @ApiResponse({ status: 404, description: 'Job category not found.' })
  remove(@Param('id') id: string) {
    return this.jobCategoriesService.remove(+id);
  }
}
