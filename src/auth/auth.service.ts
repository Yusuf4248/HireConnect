import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  async register(dto: CreateAuthDto) {
    const existing = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (existing) {
      throw new BadRequestException('Email already registered');
    }

    const hashed = await bcrypt.hash(dto.password, 10);

    const newUser = this.usersRepo.create({
      email: dto.email,
      password_hash: hashed,
      role: dto.role || 'user',
    });

    await this.usersRepo.save(newUser);

    const tokens = await this.generateTokens(newUser.id, newUser.role);
    await this.updateRefreshToken(newUser.id, tokens.refresh_token);

    return { user: newUser, ...tokens };
  }

  async login(dto: LoginAuthDto, res: Response) {
    console.log(process.env.SECRET_KEY);

    const user = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(dto.password, user.password_hash);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const tokens = await this.generateTokens(user.id, user.role);

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    res.json({ message: "you logined!", access_token: tokens.access_token })
    return { user, ...tokens };
  }

  async logout(refreshToken: string, res: Response) {
    if (!refreshToken) throw new UnauthorizedException();

    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.SECRET_KEY,
      });


      await this.usersRepo.update(payload.sub, { refresh_token: null });


      res.clearCookie('refresh_token');

      return { message: 'Logged out successfully' };
    } catch {
      throw new UnauthorizedException();
    }
  }


  async refreshTokens(refreshToken: string,res:Response) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.SECRET_KEY,
      });

      const user = await this.usersRepo.findOne({ where: { id: payload.sub } });
      if (!user || !user.refresh_token) throw new UnauthorizedException();

      const isMatch = await bcrypt.compare(refreshToken, user.refresh_token);
      if (!isMatch) throw new UnauthorizedException();

      const tokens = await this.generateTokens(user.id, user.role);

      res.cookie('refresh_token', tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/',
      });
      await this.updateRefreshToken(user.id, tokens.refresh_token);

      res.json({message:"token refreshed",tokens:{tokens}})

    } catch (err) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }


  private async generateTokens(userId: number, role: string) {
    const payload = { sub: userId, role };
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    return { access_token, refresh_token };
  }

  private async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefresh = await bcrypt.hash(refreshToken, 10);
    await this.usersRepo.update(userId, { refresh_token: hashedRefresh });
  }
}
