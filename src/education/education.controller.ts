import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from "@nestjs/common";
import { EducationService } from "./education.service";
import { CreateEducationDto } from "./dto/create-education.dto";
import { UpdateEducationDto } from "./dto/update-education.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles-auth.decorator";
import { IsJobSeekerGuard } from "../common/guards/is.job.seeker.guard";

@ApiTags('Education')
@ApiBearerAuth()
@Controller('educations')
@UseGuards(AuthGuard, RolesGuard)
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  @Roles('job_seeker')
  @ApiOperation({ summary: 'Create a new education record' })
  @ApiResponse({
    status: 201,
    description: 'Education created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed',
  })
  @ApiBody({ type: CreateEducationDto })
  create(@Body() createEducationDto: CreateEducationDto) {
    return this.educationService.create(createEducationDto);
  }

  @Get()
  @Roles('hr', 'admin')
  @Roles('admin', 'hr')
  @ApiOperation({ summary: 'Get all educations with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    description: 'List of all education records',
  })
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.educationService.findAll(+page, +limit);
  }

  @Get(':id')
  @Roles('hr', 'admin')
  @Roles('admin', 'hr')
  @ApiOperation({ summary: 'Get a single education record by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the education record',
  })
  @ApiResponse({
    status: 200,
    description: 'Education found',
  })
  @ApiResponse({
    status: 404,
    description: 'Education not found',
  })
  findOne(@Param('id') id: string) {
    return this.educationService.findOne(+id);
  }

  @Patch(':id')
  @Roles('job_seeker')
  @ApiOperation({ summary: 'Update an education record by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the education record to update',
  })
  @ApiBody({ type: UpdateEducationDto })
  @ApiResponse({
    status: 200,
    description: 'Education updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Education not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed',
  })
  update(
    @Param('id') id: string,
    @Body() updateEducationDto: UpdateEducationDto,
  ) {
    return this.educationService.update(+id, updateEducationDto);
  }

  @Delete(':id')
  @Roles('job_seeker')
  @ApiOperation({ summary: 'Delete an education record by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the education record to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'Education deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Education not found',
  })
  remove(@Param('id') id: string) {
    return this.educationService.remove(+id);
  }
}
