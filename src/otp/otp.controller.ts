import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { OtpService } from './otp.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { Request, Response } from 'express';

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
}
