import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { LoginAuthDto } from '../dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { JobSeekersService } from '../../job_seekers/job_seekers.service';
import { JobSeeker } from '../../job_seekers/entities/job_seeker.entity';
import { CreateJobSeekerDto } from '../../job_seekers/dto/create-job_seeker.dto';

@Injectable()
export class JobSeekerAuthService {
  constructor(
    private readonly jobSeekerService: JobSeekersService,
    private readonly jwtService: JwtService,
  ) {}

  async generateTokens(jobSeeker: JobSeeker) {
    const payload = {
      id: jobSeeker.id,
      email: jobSeeker.email,
      role: 'jobSeeker',
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

  async register(createJobSeekerDto: CreateJobSeekerDto) {
    const candidate = await this.jobSeekerService.findByEmail(
      createJobSeekerDto.email,
    );
    if (candidate) {
      throw new BadRequestException(
        'job seeker with this email already exists',
      );
    }
    const lid = await this.jobSeekerService.create(createJobSeekerDto);
    return {
      lid,
    };
  }

  async logIn(loginDto: LoginAuthDto, res: Response) {
    const jobSeeker = await this.jobSeekerService.findByEmail(loginDto.email);
    if (!jobSeeker) {
      throw new BadRequestException('Email or pasword is incorrect');
    }

    const validPassword = await bcrypt.compare(
      loginDto.password,
      jobSeeker.password_hash,
    );
    if (!validPassword) {
      throw new BadRequestException('Email or password is incorrect');
    }
    const { accessToken, refreshToken } = await this.generateTokens(jobSeeker);

    res.cookie('refresh_token', refreshToken, {
      maxAge: Number(process.env.COOKIE_REFRESH_TIME),
      httpOnly: true,
    });
    const refreshTokenHash = await bcrypt.hash(refreshToken, 7);
    await this.jobSeekerService.updateTokenHash(jobSeeker.id, refreshTokenHash);

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
    const jobSeeker = await this.jobSeekerService.findByEmail(
      decoded_token.email,
    );
    if (!jobSeeker) {
      throw new BadRequestException('Something went wrong');
    }
    await this.jobSeekerService.updateTokenHash(jobSeeker.id, '');
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
    const jobSeeker = await this.jobSeekerService.findByEmail(
      decoded_token.email,
    );
    if (!jobSeeker) {
      throw new BadRequestException('Something went wrong');
    }

    const { accessToken, refreshToken } = await this.generateTokens(jobSeeker);

    const refreshTokenHash = await bcrypt.hash(refreshToken, 7);
    await this.jobSeekerService.updateTokenHash(jobSeeker.id, refreshTokenHash);

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
