import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LoginAuthDto } from '../dto/login-auth.dto';
import { JobSeekerAuthService } from './job-seeker.auth.service';

@ApiTags('JobSeekerAuth')
@Controller('job-seeker-auth')
export class JobSeekerAuthController {
  constructor(private readonly jobSeekerAuthService: JobSeekerAuthService) {}

  @Post('log-in')
  @ApiOperation({
    summary: 'Job seeker login',
    description:
      'Authenticates an job seeker user and returns access and refresh tokens.',
  })
  @ApiBody({ type: LoginAuthDto, description: 'Job seeker login credentials' })
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
    return this.jobSeekerAuthService.logIn(logInDto, res);
  }

  @Get('log-out')
  @ApiBearerAuth() // Indicates that a JWT token is required
  @ApiOperation({
    summary: 'Job seeker logout',
    description: 'Logs out an job seeker by invalidating the refresh token.',
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
    return this.jobSeekerAuthService.logOut(request, response);
  }

  @Get('refresh-tokens')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Refresh job seeker tokens',
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
    return this.jobSeekerAuthService.refreshTokens(request, response);
  }
}
