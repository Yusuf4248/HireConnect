import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiConsumes,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('resumes')
@ApiBearerAuth()
@Controller('resumes')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Create a new resume' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: 'Resume created successfully',
    type: CreateResumeDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiBody({
    description: "Resume ma'lumotlari va faylni yuboring",
    required: true,
    schema: {
      type: 'object',
      properties: {
        job_seeker_id: {
          type: 'number',
          example: 123,
          description: 'Job seeker ID associated with the resume',
        },
        is_primary: {
          type: 'boolean',
          example: true,
          description: 'Whether this is the primary resume',
        },
        file: {
          type: 'string',
          format: 'binary',
          description: 'Yuklanayotgan resume fayl (.pdf, .doc, .docx)',
        },
      },
    },
  })
  async create(
    @Body() dto: CreateResumeDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }), // 5MB max
          new FileTypeValidator({ fileType: /(pdf|doc|docx)$/i }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.resumeService.create(dto, file);
  }

  @Get()
  @ApiOperation({ summary: 'Get all resumes' })
  @ApiResponse({
    status: 200,
    description: 'List of all resumes',
    type: [CreateResumeDto],
  })
  findAll() {
    return this.resumeService.findAll();
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'Get all resumes' })
  @ApiResponse({
    status: 200,
    description: 'List of all resumes',
    type: [CreateResumeDto],
  })
  findUserResumes(@Param('id') id: number
  // ,@Param('role') role: string
) {
    return this.resumeService.findUserResumes(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a resume by ID' })
  @ApiParam({ name: 'id', description: 'Resume ID', type: String })
  @ApiResponse({
    status: 200,
    description: 'Resume found',
    type: CreateResumeDto,
  })
  @ApiResponse({ status: 404, description: 'Resume not found' })
  findOne(@Param('id') id: string) {
    return this.resumeService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a resume by ID' })
  @ApiParam({ name: 'id', description: 'Resume ID', type: String })
  @ApiBody({ type: UpdateResumeDto })
  @ApiResponse({
    status: 200,
    description: 'Resume updated successfully',
    type: CreateResumeDto,
  })
  @ApiResponse({ status: 404, description: 'Resume not found' })
  update(@Param('id') id: string, @Body() dto: UpdateResumeDto) {
    return this.resumeService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a resume by ID' })
  @ApiParam({ name: 'id', description: 'Resume ID', type: String })
  @ApiResponse({ status: 200, description: 'Resume deleted successfully' })
  @ApiResponse({ status: 404, description: 'Resume not found' })
  remove(@Param('id') id: string) {
    return this.resumeService.remove(+id);
  }
}
