import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
  async saveImage(fileBuffer: Buffer, originalName): Promise<string> {
    const extension = path.extname(originalName).toLowerCase() || '.pdf';
    const fileName = `${uuidv4()}${extension}`;
const dirpath = path.resolve(__dirname, '..', 'public', 'images');

    console.log('in FileService');

    if (!fs.existsSync(dirpath)) {
      fs.mkdirSync(dirpath, { recursive: true });
    }

    fs.writeFileSync(path.join(dirpath, fileName), fileBuffer);
    return fileName;
  }
}
