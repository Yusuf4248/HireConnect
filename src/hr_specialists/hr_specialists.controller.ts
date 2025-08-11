import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { HrSpecialistsService } from "./hr_specialists.service";
import { CreateHrSpecialistDto } from "./dto/create-hr_specialist.dto";
import { UpdateHrSpecialistDto } from "./dto/update-hr_specialist.dto";
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

@ApiTags("HR Specialists")
@ApiBearerAuth() // If authentication is required
@Controller("hr-specialists")
export class HrSpecialistsController {
  constructor(private readonly hrSpecialistsService: HrSpecialistsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new HR specialist" })
  @ApiCreatedResponse({
    description: "The HR specialist has been successfully created",
    type: CreateHrSpecialistDto,
  })
  @ApiBadRequestResponse({ description: "Invalid input data" })
  @ApiBody({ type: CreateHrSpecialistDto })
  create(@Body() createHrSpecialistDto: CreateHrSpecialistDto) {
    return this.hrSpecialistsService.create(createHrSpecialistDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all HR specialists" })
  @ApiOkResponse({
    description: "List of all HR specialists",
    type: [CreateHrSpecialistDto],
    isArray: true,
  })
  findAll() {
    return this.hrSpecialistsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get HR specialist by ID" })
  @ApiOkResponse({
    description: "The HR specialist with the requested ID",
    type: CreateHrSpecialistDto,
  })
  @ApiNotFoundResponse({ description: "HR specialist not found" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "ID of the HR specialist to retrieve",
    example: 1,
  })
  findOne(@Param("id") id: string) {
    return this.hrSpecialistsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update HR specialist information" })
  @ApiOkResponse({
    description: "The HR specialist has been successfully updated",
    type: UpdateHrSpecialistDto,
  })
  @ApiNotFoundResponse({ description: "HR specialist not found" })
  @ApiBadRequestResponse({ description: "Invalid input data" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "ID of the HR specialist to update",
    example: 1,
  })
  @ApiBody({ type: UpdateHrSpecialistDto })
  update(
    @Param("id") id: string,
    @Body() updateHrSpecialistDto: UpdateHrSpecialistDto
  ) {
    return this.hrSpecialistsService.update(+id, updateHrSpecialistDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete an HR specialist" })
  @ApiOkResponse({
    description: "The HR specialist has been successfully deleted",
  })
  @ApiNotFoundResponse({ description: "HR specialist not found" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "ID of the HR specialist to delete",
    example: 1,
  })
  remove(@Param("id") id: string) {
    return this.hrSpecialistsService.remove(+id);
  }
}
