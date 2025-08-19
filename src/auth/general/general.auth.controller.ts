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
import { GeneralAuthService } from './general.auth.service';
import { AuthGuard } from '../../common/guards/auth.guard';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ForgetPasswordDto } from '../dto/forget-password.dto';
import { Request, Response } from 'express';
import { VerifyOtpDto } from '../../otp/dto/verify-otp.dto';
import { NewPasswordDto } from '../dto/new-password.dto';

@Controller('general-auth')
export class GeneralAuthController {
  constructor(private readonly generalAuthService: GeneralAuthService) {}
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
    return this.generalAuthService.getUniversalProfile(user.id, user.role);
  }

  @Post('forget-password')
  @ApiOperation({ summary: 'Send OTP for password reset' })
  @ApiResponse({ status: 200, description: 'OTP sent successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBody({ type: ForgetPasswordDto })
  async forgetPassword(
    @Body() forgetPasswordDto: ForgetPasswordDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.generalAuthService.forgetPassword(forgetPasswordDto, res);
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify OTP code' })
  @ApiResponse({ status: 200, description: 'OTP verified successfully' })
  @ApiResponse({ status: 400, description: 'Invalid or expired OTP' })
  @ApiBody({ type: VerifyOtpDto })
  async verifyOtp(@Req() req: Request, @Body() verifyOtpDto: VerifyOtpDto) {
    return this.generalAuthService.verifyOtp(verifyOtpDto, req);
  }

  @Post('new-password')
  @ApiOperation({ summary: 'Send new password' })
  @ApiResponse({
    status: 200,
    description: 'Your password successfully changed!',
  })
  @ApiResponse({
    status: 400,
    description: 'Something went wrong or Passwords do not match',
  })
  @ApiBody({ type: NewPasswordDto })
  async newPassword(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
    @Body() dto: NewPasswordDto,
  ) {
    return this.generalAuthService.newPassword(dto, req, res);
  }
}
