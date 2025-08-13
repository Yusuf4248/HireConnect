import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AdminAuthService } from './admin.auth.service';
import { LoginAuthDto } from '../dto/login-auth.dto';

@ApiTags('AdminAuth')
@Controller('admin-auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('log-in')
  @ApiOperation({
    summary: 'Admin login',
    description:
      'Authenticates an admin user and returns access and refresh tokens.',
  })
  @ApiBody({ type: LoginAuthDto, description: 'Admin login credentials' })
  @ApiResponse({
    status: 201,
    description: 'Login successful, tokens returned',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid credentials',
    schema: {
      example: {
        message: 'Invalid username or password',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    schema: {
      example: {
        message: 'Internal server error',
        error: 'Internal Server Error',
        statusCode: 500,
      },
    },
  })
  async signIn(
    @Body() logInDto: LoginAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminAuthService.logIn(logInDto, res);
  }

  @Get('log-out')
  @ApiBearerAuth() // Indicates that a JWT token is required
  @ApiOperation({
    summary: 'Admin logout',
    description: 'Logs out an admin by invalidating the refresh token.',
  })
  @ApiResponse({
    status: 200,
    description: 'Logout successful',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing token',
    schema: {
      example: {
        message: 'Unauthorized',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    schema: {
      example: {
        message: 'Internal server error',
        error: 'Internal Server Error',
        statusCode: 500,
      },
    },
  })
  signout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.adminAuthService.logOut(request, response);
  }

  @Get('refresh-tokens')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Refresh admin tokens',
    description: 'Refreshes the access token using a valid refresh token.',
  })
  @ApiResponse({
    status: 200,
    description: 'Tokens refreshed successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing refresh token',
    schema: {
      example: {
        message: 'Invalid refresh token',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    schema: {
      example: {
        message: 'Internal server error',
        error: 'Internal Server Error',
        statusCode: 500,
      },
    },
  })
  refreshTokens(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.adminAuthService.refreshTokens(request, response);
  }
}
