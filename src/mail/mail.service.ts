// mailer.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import * as juice from 'juice';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendOtpMail(to: string, otp: string) {
    const templatePath = path.join(__dirname, 'templates', 'otp.hbs');
    let html = fs.readFileSync(templatePath, 'utf8');

    // Replace dynamic values
    html = html.replace('{{OTP}}', otp);

    // Inline CSS with Juice
    const inlinedHtml = juice(html);

    await this.transporter.sendMail({
      from: `"My App" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Your OTP Code',
      html: inlinedHtml,
    });
  }



    async sendHelloMail(to: string) {
    const templatePath = path.join(process.cwd(), 'src', 'mail', 'templates', 'hi.hbs');
    let html = fs.readFileSync(templatePath, 'utf8');



    // Inline CSS with Juice
    const inlinedHtml = juice(html);

    await this.transporter.sendMail({
      from: `"My App" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Your OTP Code',
      html: inlinedHtml,
    });
  }
}
