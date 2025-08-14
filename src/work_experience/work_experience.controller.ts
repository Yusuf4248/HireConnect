import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { WorkExperienceService } from "./work_experience.service";
import { CreateWorkExperienceDto } from "./dto/create-work_experience.dto";
import { UpdateWorkExperienceDto } from "./dto/update-work_experience.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { Roles } from "../common/decorators/roles-auth.decorator";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";

@ApiTags('Work Experience')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('work-experience')
export class WorkExperienceController {
  constructor(private readonly workExperienceService: WorkExperienceService) {}

  @Post()
  @Roles('job_seeker')
  @ApiOperation({ summary: 'Create work experience' })
  @ApiResponse({
    status: 201,
    description: 'The work experience has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreateWorkExperienceDto })
  create(@Body() createWorkExperienceDto: CreateWorkExperienceDto) {
    return this.workExperienceService.create(createWorkExperienceDto);
  }

  @Get()
  @Roles('job_seeker', 'hr')
  @ApiOperation({ summary: 'Get all work experiences' })
  @ApiResponse({ status: 200, description: 'Return all work experiences.' })
  findAll() {
    return this.workExperienceService.findAll();
  }

  @Get(':id')
  @Roles('job_seeker', 'hr')
  @ApiOperation({ summary: 'Get work experience by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the work experience with the specified ID.',
  })
  @ApiResponse({ status: 404, description: 'Work experience not found.' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID of the work experience',
  })
  findOne(@Param('id') id: string) {
    return this.workExperienceService.findOne(+id);
  }

  @Patch(':id')
  @Roles('job_seeker')
  @ApiOperation({ summary: 'Update work experience' })
  @ApiResponse({
    status: 200,
    description: 'The work experience has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Work experience not found.' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID of the work experience to update',
  })
  @ApiBody({ type: UpdateWorkExperienceDto })
  update(
    @Param('id') id: string,
    @Body() updateWorkExperienceDto: UpdateWorkExperienceDto,
  ) {
    return this.workExperienceService.update(+id, updateWorkExperienceDto);
  }

  @Delete(':id')
  @Roles('job_seeker')
  @ApiOperation({ summary: 'Delete work experience' })
  @ApiResponse({
    status: 200,
    description: 'The work experience has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Work experience not found.' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID of the work experience to delete',
  })
  remove(@Param('id') id: string) {
    return this.workExperienceService.remove(+id);
  }
}
