import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompanyHrSpecialistsService } from './company_hr_specialists.service';
import { CreateCompanyHrSpecialistDto } from './dto/create-company_hr_specialist.dto';
import { UpdateCompanyHrSpecialistDto } from './dto/update-company_hr_specialist.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Company HR Specialists')
@Controller('company-hr-specialists')
export class CompanyHrSpecialistsController {
  constructor(
    private readonly companyHrSpecialistsService: CompanyHrSpecialistsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new company HR specialist' })
  @ApiResponse({
    status: 201,
    description: 'Company HR specialist created successfully',
  })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiBody({ type: CreateCompanyHrSpecialistDto })
  create(@Body() createCompanyHrSpecialistDto: CreateCompanyHrSpecialistDto) {
    return this.companyHrSpecialistsService.create(
      createCompanyHrSpecialistDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all company HR specialists' })
  @ApiResponse({
    status: 200,
    description: 'List of all company HR specialists',
  })
  findAll() {
    return this.companyHrSpecialistsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get company HR specialist by ID' })
  @ApiResponse({ status: 200, description: 'Company HR specialist found' })
  @ApiResponse({ status: 404, description: 'Company HR specialist not found' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the HR specialist relation',
  })
  findOne(@Param('id') id: string) {
    return this.companyHrSpecialistsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update company HR specialist by ID' })
  @ApiResponse({
    status: 200,
    description: 'Company HR specialist updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Company HR specialist not found' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the HR specialist relation',
  })
  @ApiBody({ type: UpdateCompanyHrSpecialistDto })
  update(
    @Param('id') id: string,
    @Body() updateCompanyHrSpecialistDto: UpdateCompanyHrSpecialistDto,
  ) {
    return this.companyHrSpecialistsService.update(
      +id,
      updateCompanyHrSpecialistDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete company HR specialist by ID' })
  @ApiResponse({
    status: 200,
    description: 'Company HR specialist deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Company HR specialist not found' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the HR specialist relation',
  })
  remove(@Param('id') id: string) {
    return this.companyHrSpecialistsService.remove(+id);
  }
}
