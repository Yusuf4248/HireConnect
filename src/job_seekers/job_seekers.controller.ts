import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { JobSeekersService } from "./job_seekers.service";
import { CreateJobSeekerDto } from "./dto/create-job_seeker.dto";
import { UpdateJobSeekerDto } from "./dto/update-job_seeker.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";

@ApiTags("Job Seekers")
@ApiBearerAuth()
@Controller("job-seekers")
export class JobSeekersController {
  constructor(private readonly jobSeekersService: JobSeekersService) {}

  @Post()
  @ApiOperation({ summary: "Create a new job seeker" })
  @ApiCreatedResponse({
    description: "The job seeker has been successfully created",
    type: CreateJobSeekerDto,
  })
  @ApiBadRequestResponse({ description: "Invalid input data" })
  @ApiBody({ type: CreateJobSeekerDto })
  create(@Body() createJobSeekerDto: CreateJobSeekerDto) {
    return this.jobSeekersService.create(createJobSeekerDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all job seekers" })
  @ApiOkResponse({
    description: "List of all job seekers",
    type: [CreateJobSeekerDto],
  })
  findAll() {
    return this.jobSeekersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a job seeker by ID" })
  @ApiOkResponse({
    description: "The job seeker with the requested ID",
    type: CreateJobSeekerDto,
  })
  @ApiNotFoundResponse({ description: "Job seeker not found" })
  @ApiParam({
    name: "id",
    type: "number",
    description: "ID of the job seeker to retrieve",
  })
  findOne(@Param("id") id: string) {
    return this.jobSeekersService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a job seeker" })
  @ApiOkResponse({
    description: "The job seeker has been successfully updated",
    type: UpdateJobSeekerDto,
  })
  @ApiNotFoundResponse({ description: "Job seeker not found" })
  @ApiBadRequestResponse({ description: "Invalid input data" })
  @ApiParam({
    name: "id",
    type: "number",
    description: "ID of the job seeker to update",
  })
  @ApiBody({ type: UpdateJobSeekerDto })
  update(
    @Param("id") id: string,
    @Body() updateJobSeekerDto: UpdateJobSeekerDto
  ) {
    return this.jobSeekersService.update(+id, updateJobSeekerDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a job seeker" })
  @ApiOkResponse({
    description: "The job seeker has been successfully deleted",
  })
  @ApiNotFoundResponse({ description: "Job seeker not found" })
  @ApiParam({
    name: "id",
    type: "number",
    description: "ID of the job seeker to delete",
  })
  remove(@Param("id") id: string) {
    return this.jobSeekersService.remove(+id);
  }
}
