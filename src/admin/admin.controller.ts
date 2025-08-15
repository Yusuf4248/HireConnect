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
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SelfAdminGuard } from '../common/guards/admin.self.guard';
import { AuthGuard } from '../common/guards/auth.guard';
import { IsAdminGuard } from '../common/guards/is.admin.guard';
import { IsSuperAdminGuard } from '../common/guards/is.super.admin.guard';

@ApiTags('admin')
@ApiBearerAuth()
@Controller('admin')
@UseGuards(AuthGuard, IsAdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @UseGuards(IsSuperAdminGuard)
  @ApiOperation({ summary: 'Create a new admin' })
  @ApiBody({ type: CreateAdminDto })
  @ApiResponse({
    status: 201,
    description: 'Admin created successfully',
    type: CreateAdminDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all admins' })
  @ApiResponse({
    status: 200,
    description: 'List of all admins',
    type: [CreateAdminDto],
  })
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  @UseGuards(SelfAdminGuard)
  @ApiOperation({ summary: 'Get an admin by ID' })
  @ApiParam({ name: 'id', description: 'Admin ID', type: String })
  @ApiResponse({
    status: 200,
    description: 'Admin found',
    type: CreateAdminDto,
  })
  @ApiResponse({ status: 404, description: 'Admin not found' })
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(SelfAdminGuard)
  @ApiOperation({ summary: 'Update an admin by ID' })
  @ApiParam({ name: 'id', description: 'Admin ID', type: String })
  @ApiBody({ type: UpdateAdminDto })
  @ApiResponse({
    status: 200,
    description: 'Admin updated successfully',
    type: CreateAdminDto,
  })
  @ApiResponse({ status: 404, description: 'Admin not found' })
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  @UseGuards(SelfAdminGuard)
  @ApiOperation({ summary: 'Delete an admin by ID' })
  @ApiParam({ name: 'id', description: 'Admin ID', type: String })
  @ApiResponse({ status: 200, description: 'Admin deleted successfully' })
  @ApiResponse({ status: 404, description: 'Admin not found' })
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
