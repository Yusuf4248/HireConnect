import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminService } from '../../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '../../admin/entities/admin.entity';
import { Request, Response } from 'express';
import { LoginAuthDto } from '../dto/login-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async generateTokens(admin: Admin) {
    const payload = {
      id: admin.id,
      email: admin.email,
      role: 'admin',
      is_creator: admin.is_creator,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async logIn(loginDto: LoginAuthDto, res: Response) {
    const admin = await this.adminService.findByEmail(loginDto.email);
    if (!admin) {
      throw new BadRequestException('Email or pasword is incorrect');
    }

    const validPassword = await bcrypt.compare(
      loginDto.password,
      admin.password_hash,
    );
    if (!validPassword) {
      throw new BadRequestException('Email or password is incorrect');
    }
    const { accessToken, refreshToken } = await this.generateTokens(admin);

    res.cookie('refresh_token', refreshToken, {
      maxAge: Number(process.env.COOKIE_REFRESH_TIME),
      httpOnly: true,
    });
    const refreshTokenHash = await bcrypt.hash(refreshToken, 7);
    await this.adminService.updateTokenHash(admin.id, refreshTokenHash);

    return { message: 'Successfully logged in', access_token: accessToken };
  }

  async logOut(req: Request, res: Response) {
    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token) {
      throw new UnauthorizedException('Refresh token not found. Please log in');
    }

    const decoded_token = await this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    const admin = await this.adminService.findByEmail(decoded_token.email);
    if (!admin) {
      throw new BadRequestException('Something went wrong');
    }
    await this.adminService.updateTokenHash(admin.id, '');
    res.clearCookie('refresh_token');

    return {
      success: true,
      message: 'Signed out successfully',
    };
  }

  async refreshTokens(req: Request, res: Response) {
    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token) {
      throw new UnauthorizedException('Refresh token not found. Please log in');
    }
    const decoded_token = await this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    const admin = await this.adminService.findByEmail(decoded_token.email);
    if (!admin) {
      throw new BadRequestException('Something went wrong');
    }

    const { accessToken, refreshToken } = await this.generateTokens(admin);

    const refreshTokenHash = await bcrypt.hash(refreshToken, 7);
    await this.adminService.updateTokenHash(admin.id, refreshTokenHash);

    res.cookie('refresh_token', refreshToken, {
      maxAge: Number(process.env.COOKIE_REFRESH_TIME),
      httpOnly: true,
    });

    return {
      success: true,
      message: 'Tokens updated!',
      access_token: accessToken,
    };
  }
}
