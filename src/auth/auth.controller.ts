import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

import { Request, Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  register(@Body() dto: CreateAuthDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  login(@Body() dto: LoginAuthDto, @Res() res: Response) {
    return this.authService.login(dto, res);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout user' })
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.refresh_token;
    return this.authService.logout(refreshToken, res);
  }


  @Post('refresh')
  @ApiOperation({ summary: 'Refresh tokens' })
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refresh_token = req.cookies?.refresh_token;
    return this.authService.refreshTokens(refresh_token, res);
  }


@Get('activate/:token')
@ApiOperation({ summary: 'Activate user account' })
async activate(@Param('token') token: string) {
  console.log('Activate endpoint hit with token:', token);
  return this.authService.activate(token);
}


}
