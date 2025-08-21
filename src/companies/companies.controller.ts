import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import { IsHrGuard } from '../common/guards/is.hr.guard';
import { IsAdminGuard } from '../common/guards/is.admin.guard';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthGuard } from '../common/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Company } from './entities/company.entity';

@ApiTags('companies')
@ApiBearerAuth()
@Controller('companies')
@UseGuards(AuthGuard, RolesGuard)
export class CompaniesController {
  constructor(private readonly companyService: CompaniesService) {}

  @Post()
  @Roles('hr', 'admin')
  @ApiOperation({ summary: 'Create a new company (with logo upload)' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiBody({
    description: 'Company data with optional logo file',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Tech Corp' },
        description: { type: 'string', example: 'A tech company' },
        website: { type: 'string', example: 'https://techcorp.com' },
        image: {
          type: 'string',
          format: 'binary',
          description: 'Company image file',
        },
        industry: { type: 'string', example: 'Technology' },
        location: { type: 'string', example: 'New York, NY' },
        phone: { type: 'string', example: '+998901234567' },
        email: { type: 'string', example: 'contact@techcorp.com' },
        founded_year: { type: 'integer', example: 2010 },
      },
      required: [
        'name',
        'industry',
        'location',
        'phone',
        'email',
        'founded_year',
      ],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Company created successfully',
    type: Company,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(
    @Body() createCompanyDto: CreateCompanyDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Company> {
    return await this.companyService.createCompany(createCompanyDto, image);
  }

  @Get()
  @Roles('admin', 'hr')
  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({
    status: 200,
    description: 'List of all companies',
    type: [CreateCompanyDto],
  })
  async findAll() {
    return await this.companyService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'hr')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get a company by ID' })
  @ApiParam({ name: 'id', description: 'Company ID', type: String })
  @ApiResponse({
    status: 200,
    description: 'Company found',
    type: CreateCompanyDto,
  })
  @ApiResponse({ status: 404, description: 'Company not found' })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.companyService.findById(id);
  }

  @Patch(':id')
  @Roles('hr', 'admin')
  @ApiOperation({ summary: 'Update a company by ID' })
  @ApiParam({ name: 'id', description: 'Company ID', type: String })
  @ApiBody({ type: UpdateCompanyDto })
  @ApiResponse({
    status: 200,
    description: 'Company updated successfully',
    type: CreateCompanyDto,
  })
  @ApiResponse({ status: 404, description: 'Company not found' })
  async update(@Param('id') id: string, @Body() update: UpdateCompanyDto) {
    return await this.companyService.update(Number(id), update);
  }

  @Delete(':id')
  @Roles('admin', 'hr')
  @ApiOperation({ summary: 'Delete a company by ID' })
  @ApiParam({ name: 'id', description: 'Company ID', type: String })
  @ApiResponse({ status: 200, description: 'Company deleted successfully' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.companyService.delete(id);
  }
}
