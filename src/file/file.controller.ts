import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileService } from './file.service';

@ApiTags('Files')
@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Файл не предоставлен');
    }

    // Проверка размера файла (например, максимум 50MB)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      throw new BadRequestException('Файл слишком большой. Максимальный размер: 50MB');
    }

    // Проверка типа файла
    const allowedMimeTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'audio/mpeg', 'audio/wav', 'audio/webm', 'audio/ogg', 'audio/mp4',
      'video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo',
      'application/pdf', 'text/plain',
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Неподдерживаемый тип файла');
    }

    try {
      const fileName = await this.fileService.saveImage(file.buffer, file.originalname);
      
      return {
        success: true,
        fileName,
        url: `/public/images/${fileName}`,
        originalName: file.originalname,
        size: file.size,
        mimeType: file.mimetype,
      };
    } catch (error) {
      throw new BadRequestException('Ошибка при сохранении файла: ' + error.message);
    }
  }
}