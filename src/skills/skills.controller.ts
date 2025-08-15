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
import { SkillsService } from "./skills.service";
import { CreateSkillDto } from "./dto/create-skill.dto";
import { UpdateSkillDto } from "./dto/update-skill.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { Roles } from "../common/decorators/roles-auth.decorator";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";

@ApiTags('Skills')
@ApiBearerAuth()
@Controller('skills')
@UseGuards(AuthGuard, RolesGuard)
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Create a new skill' })
  @ApiResponse({ status: 201, description: 'Skill successfully created' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiBody({ type: CreateSkillDto })
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.create(createSkillDto);
  }

  @Get()
  @Roles('admin', 'hr')
  @ApiOperation({ summary: 'Get all skills with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'List of all skills' })
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.skillsService.findAll(+page, +limit);
  }

  @Get(':id')
  @Roles('admin', 'hr')
  @ApiOperation({ summary: 'Get skill by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the skill' })
  @ApiResponse({ status: 200, description: 'Skill found' })
  @ApiResponse({ status: 404, description: 'Skill not found' })
  findOne(@Param('id') id: string) {
    return this.skillsService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update skill by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the skill to update',
  })
  @ApiResponse({ status: 200, description: 'Skill updated successfully' })
  @ApiResponse({ status: 404, description: 'Skill not found' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiBody({ type: UpdateSkillDto })
  update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillsService.update(+id, updateSkillDto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete skill by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the skill to delete',
  })
  @ApiResponse({ status: 200, description: 'Skill deleted successfully' })
  @ApiResponse({ status: 404, description: 'Skill not found' })
  remove(@Param('id') id: string) {
    return this.skillsService.remove(+id);
  }

  @Get('by-name/:name')
  @Roles('hr')
  @ApiOperation({ summary: 'Get skill by name' })
  @ApiParam({ name: 'name', type: String, example: 'JavaScript' })
  @ApiResponse({ status: 200, description: 'Skill found' })
  @ApiResponse({ status: 404, description: 'Skill not found' })
  getSkillByName(@Param('name') name: string) {
    return this.skillsService.findSkillByName(name);
  }
}
