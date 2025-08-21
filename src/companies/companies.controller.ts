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
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
  ApiConsumes,
  ApiQuery,
} from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { IsAdminGuard } from '../common/guards/is.admin.guard';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthGuard } from '../common/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Company } from './entities/company.entity';
import { CompanyStatus } from '../common/enums/company.enum';

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
    @Req() req: any,
  ): Promise<Company> {
    const hr = req.user;
    return await this.companyService.createCompany(
      createCompanyDto,
      image,
      hr.id,
    );
  }

  @Get()
  @Roles('admin', 'hr')
  @ApiOperation({ summary: 'Get all companies' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    description: 'List of all companies',
    type: [CreateCompanyDto],
  })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return await this.companyService.findAll(page, limit);
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
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a company by ID' })
  @ApiParam({ name: 'id', description: 'Company ID', type: String })
  @ApiResponse({ status: 200, description: 'Company deleted successfully' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.companyService.delete(id);
  }

  @Patch(':id/status')
  @UseGuards(IsAdminGuard)
  @ApiOperation({ summary: 'Update company verification status' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Company ID',
    example: 1,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: [CompanyStatus.VERIFIED, CompanyStatus.NOT_VERIFIED],
          example: CompanyStatus.VERIFIED,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Company status successfully updated',
  })
  @ApiResponse({ status: 404, description: 'Company or HR not found' })
  async updateCompanyStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: CompanyStatus,
  ) {
    return await this.companyService.updateCompanyStatus(id, status);
  }
}
