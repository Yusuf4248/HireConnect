import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const hashedPassword = await bcrypt.hash(createAdminDto.password_hash, 7);

    const user = this.adminRepository.create({
      ...createAdminDto,
      password_hash: hashedPassword,
    });

    return this.adminRepository.save(user);
  }

  findAll() {
    return this.adminRepository.find();
  }

  async findOne(id: number) {
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException(`Admin with id-${id} not found`);
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    await this.findOne(id);
    await this.adminRepository.update(id, updateAdminDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.adminRepository.delete(id);
  }

  async findByEmail(email: string) {
    return this.adminRepository.findOneBy({ email });
  }

  async updateTokenHash(id: number, hash: string) {
    await this.adminRepository.update(id, { refresh_token: hash });
  }
}
