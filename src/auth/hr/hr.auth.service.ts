import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { LoginAuthDto } from '../dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { HrSpecialistsService } from '../../hr_specialists/hr_specialists.service';
import { HrSpecialist } from '../../hr_specialists/entities/hr_specialist.entity';

@Injectable()
export class HrAuthService {
  constructor(
    private readonly hrService: HrSpecialistsService,
    private readonly jwtService: JwtService,
  ) {}

  async generateTokens(hr: HrSpecialist) {
    const payload = {
      id: hr.id,
      email: hr.email,
      role: 'hr',
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
    const hr = await this.hrService.findByEmail(loginDto.email);
    if (!hr) {
      throw new BadRequestException('Email or pasword is incorrect');
    }

    const validPassword = await bcrypt.compare(
      loginDto.password,
      hr.password_hash,
    );
    if (!validPassword) {
      throw new BadRequestException('Email or password is incorrect');
    }
    const { accessToken, refreshToken } = await this.generateTokens(hr);

    res.cookie('refresh_token', refreshToken, {
      maxAge: Number(process.env.COOKIE_REFRESH_TIME),
      httpOnly: true,
    });
    const refreshTokenHash = await bcrypt.hash(refreshToken, 7);
    await this.hrService.updateTokenHash(hr.id, refreshTokenHash);

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
    const hr = await this.hrService.findByEmail(decoded_token.email);
    if (!hr) {
      throw new BadRequestException('Something went wrong');
    }
    await this.hrService.updateTokenHash(hr.id, '');
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
    const hr = await this.hrService.findByEmail(decoded_token.email);
    if (!hr) {
      throw new BadRequestException('Something went wrong');
    }

    const { accessToken, refreshToken } = await this.generateTokens(hr);

    const refreshTokenHash = await bcrypt.hash(refreshToken, 7);
    await this.hrService.updateTokenHash(hr.id, refreshTokenHash);

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
