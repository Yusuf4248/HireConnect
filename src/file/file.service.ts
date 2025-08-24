import { Injectable, BadRequestException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
  async saveImage(fileBuffer: Buffer, originalName?: string): Promise<string> {
    // Проверяем, что originalName предоставлен, если нет — используем дефолтное расширение
    if (!originalName) {
      throw new BadRequestException('Original file name is required');
    }

    const extension = path.extname(originalName).toLowerCase() || '.webm';
    const fileName = `${uuidv4()}${extension}`;
    const dirpath = path.resolve(__dirname, '..', '..', 'public', 'images');

    // Проверяем, существует ли директория, и создаем её, если нет
    try {
      if (!fs.existsSync(dirpath)) {
        fs.mkdirSync(dirpath, { recursive: true });
      }

      // Сохраняем файл
      fs.writeFileSync(path.join(dirpath, fileName), fileBuffer);
      return fileName;
    } catch (error) {
      console.error('Ошибка при сохранении файла:', error);
      throw new BadRequestException('Не удалось сохранить файл');
    }
  }
}