import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { OtpService } from './otp.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '../common/guards/auth.guard';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify OTP code' })
  @ApiResponse({ status: 200, description: 'OTP verified successfully' })
  @ApiResponse({ status: 400, description: 'Invalid or expired OTP' })
  @ApiBody({ type: VerifyOtpDto })
  async verifyOtp(
    @Req() req: Request,
    @Body() verifyOtpDto: VerifyOtpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.otpService.verifyOtp(verifyOtpDto, req, res);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Universal user profile' })
  @ApiResponse({ status: 200, description: 'User profile info' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@Req() req: any) {
    const user = req.user;
    if (!user || !user.id || !user.role) {
      throw new UnauthorizedException('User info not found in token');
    }
    return this.otpService.getUniversalProfile(user.id, user.role);
  }
}
