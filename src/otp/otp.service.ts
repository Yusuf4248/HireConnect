import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as otpGenerator from 'otp-generator';
import * as uuid from 'uuid';
import { AddMinutesToDate } from '../common/helpers/add-minute';
import { Otp } from './entities/otp.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from '../mail/mail.service';
import { decode, encode } from '../common/helpers/crypto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { HrSpecialist } from '../hr_specialists/entities/hr_specialist.entity';
import { JobSeeker } from '../job_seekers/entities/job_seeker.entity';
import { Request, Response } from 'express';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp) private readonly otpRepo: Repository<Otp>,
    @InjectRepository(HrSpecialist)
    private readonly hrSpecialistRepo: Repository<HrSpecialist>,
    @InjectRepository(JobSeeker)
    private readonly jobSeekerRepo: Repository<JobSeeker>,
    private readonly mailService: MailService,
  ) {}
  async generateNewOtp(email: string, role: string = 'user', res: Response) {
    const otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 3);

    await this.otpRepo.delete({ email });

    const newOtp = await this.otpRepo.save({
      id: uuid.v4(),
      role,
      otp,
      email,
      expiration_time,
    });

    await this.mailService.sendOtpMail(email, otp);

    const details = {
      timestamp: now,
      role,
      email,
      otp_id: newOtp.id,
    };

    const verification_key = await encode(JSON.stringify(details));

    res.cookie('verification_key', verification_key, {
      maxAge: Number(process.env.COOKIE_REFRESH_TIME),
      httpOnly: true,
    });

    return {
      message: 'Otp emailga yuborildi',
      verification_key,
      otp_id: newOtp.id,
    };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto, req: Request, res: Response) {
    const verificationKey = req.cookies.verification_key;
    const decodedVerificationKey = await decode(verificationKey);
    const parsedOtpPayload = JSON.parse(decodedVerificationKey);
    let otp_details = await this.otpRepo.findOne({
      order: { created_at: 'DESC' },
      where: { email: parsedOtpPayload.email },
    });
    if (!otp_details) {
      throw new NotFoundException('Something went wrong');
    }
    const currentDate = new Date();
    if (otp_details.email !== parsedOtpPayload.email) {
      throw new BadRequestException('OTP was not sent to this email.');
    }
    if (otp_details.verified) {
      throw new BadRequestException('This otp has been used before.');
    }
    if (otp_details.expiration_time < currentDate) {
      throw new BadRequestException('This OTP has expired.');
    }
    if (+otp_details.otp !== +verifyOtpDto.otp) {
      throw new BadRequestException('Otp is not suitable');
    }

    if (otp_details.role == 'hr') {
      await this.hrSpecialistRepo.update(
        { email: otp_details.email },
        { is_active: true },
      );
    } else if (otp_details.role == 'job_seeker') {
      await this.jobSeekerRepo.update(
        { email: otp_details.email },
        { is_active: true },
      );
    }

    await this.otpRepo.update({ id: otp_details.id }, { verified: true });

    res.clearCookie('verification_key');
    return {
      message: 'Congratulations, you have been activated.',
    };
  }
}
