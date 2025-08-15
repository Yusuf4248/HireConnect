import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { JobApplicationsService } from "./job-applications.service";
import { CreateJobApplicationDto } from "./dto/create-job-application.dto";
import { UpdateJobApplicationDto } from "./dto/update-job-application.dto";
import { JobApplication } from "./entities/job-application.entity";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles-auth.decorator";

@ApiTags('Job Applications')
@ApiBearerAuth()
@Controller('job-applications')
export class JobApplicationsController {
  constructor(
    private readonly jobApplicationsService: JobApplicationsService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('jobSeeker')
  @Post()
  @ApiOperation({ summary: 'Create a new job application' })
  @ApiResponse({
    status: 201,
    description: 'Job application created successfully.',
    type: JobApplication,
  })
  create(@Body() createJobApplicationDto: CreateJobApplicationDto) {
    return this.jobApplicationsService.create(createJobApplicationDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'hr')
  @ApiOperation({ summary: 'Get a paginated list of job applications' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
    description: 'Page number for pagination',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 10,
    description: 'Number of items per page',
  })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of job applications',
    schema: {
      example: {
        data: [
          {
            id: 1,
            job_seeker_id: 42,
            resume_id: 101,
            cover_letter: 'I am excited to apply...',
            status: 'pending',
            applied_at: '2024-08-07T12:34:56.000Z',
            reviewed_at: null,
            notes: null,
          },
        ],
        total: 100,
        page: 1,
        limit: 10,
      },
    },
  })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.jobApplicationsService.findAll(+page, +limit);
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'hr')
  @ApiOperation({ summary: 'Get a job application by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Job application ID' })
  @ApiResponse({
    status: 200,
    description: 'Job application found',
    type: JobApplication,
  })
  @ApiResponse({ status: 404, description: 'Job application not found' })
  findOne(@Param('id') id: string) {
    return this.jobApplicationsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'hr')
  @ApiOperation({ summary: 'Update a job application by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Job application ID' })
  @ApiResponse({
    status: 200,
    description: 'Job application updated',
    type: JobApplication,
  })
  @ApiResponse({ status: 404, description: 'Job application not found' })
  update(
    @Param('id') id: string,
    @Body() updateJobApplicationDto: UpdateJobApplicationDto,
  ) {
    return this.jobApplicationsService.update(+id, updateJobApplicationDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'hr')
  @ApiOperation({ summary: 'Delete a job application by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Job application ID' })
  @ApiResponse({ status: 200, description: 'Job application deleted' })
  @ApiResponse({ status: 404, description: 'Job application not found' })
  remove(@Param('id') id: string) {
    return this.jobApplicationsService.remove(+id);
  }
}
