import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendOtpMail(email: string, otpCode: string) {
    await this.mailerService.sendMail({
      to: email!,
      subject: 'Your OTP Code',
      template: './otp',
      context: {
        otpCode,
      },
    });
  }
}
