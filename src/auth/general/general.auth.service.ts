import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../../admin/entities/admin.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { HrSpecialist } from '../../hr_specialists/entities/hr_specialist.entity';
import { JobSeeker } from '../../job_seekers/entities/job_seeker.entity';
import { ForgetPasswordDto } from '../dto/forget-password.dto';
import { Request, Response } from 'express';
import { OtpService } from '../../otp/otp.service';
import { VerifyOtpDto } from '../../otp/dto/verify-otp.dto';
import { decode } from '../../common/helpers/crypto';
import { Otp } from '../../otp/entities/otp.entity';
import { NewPasswordDto } from '../dto/new-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class GeneralAuthService {
  constructor(
    @InjectRepository(HrSpecialist)
    private readonly hrSpecialistRepo: Repository<HrSpecialist>,
    @InjectRepository(JobSeeker)
    private readonly jobSeekerRepo: Repository<JobSeeker>,
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
    @InjectRepository(Contact)
    private readonly contactRepo: Repository<Contact>,
    private readonly otpService: OtpService,
    @InjectRepository(Otp)
    private readonly otpRepo: Repository<Otp>,
  ) {}
  async getUniversalProfile(id: number, role: string) {
    switch (role) {
      case 'admin':
        const admin = await this.adminRepo.findOne({
          where: { id },
        });
        const adminContacts = await this.contactRepo.find({
          where: { table_name: role, table_id: id },
        });
        return {
          user: admin,
          contacts: adminContacts,
        };
      case 'hr':
        const hr = await this.hrSpecialistRepo.findOne({
          where: { id },
          relations: ['jobs'],
        });
        const hrContacts = await this.contactRepo.find({
          where: { table_name: role, table_id: id },
        });
        return {
          user: hr,
          contacts: hrContacts,
        };
      case 'job_seeker':
        const job_seeker = await this.jobSeekerRepo.findOne({
          where: { id },
          relations: [
            'job_seeker_skills',
            'work_experiences',
            'educations',
            'resumes',
            'applications',
          ],
        });
        const job_seekerContacts = await this.contactRepo.find({
          where: { table_name: role, table_id: id },
        });
        return {
          user: job_seeker,
          contacts: job_seekerContacts,
        };
      default:
        throw new NotFoundException('Something went wront. Please try again');
    }
  }

  async forgetPassword(forgetPasswordDto: ForgetPasswordDto, res: Response) {
    var { email, role } = forgetPasswordDto;
    let otp_data: any;
    switch (role) {
      case 'admin':
        const admin = await this.adminRepo.findOne({
          where: { email },
        });
        if (!admin) {
          throw new BadRequestException(`Admin with this ${email} not found`);
        }
        otp_data = await this.otpService.generateNewOtp(admin.email, role, res);
        res.cookie('verification_key', otp_data.verification_key, {
          maxAge: Number(process.env.COOKIE_REFRESH_TIME),
          httpOnly: true,
        });
        return {
          success: true,
          message: otp_data.message,
        };
      case 'hr':
        const teacher = await this.hrSpecialistRepo.findOne({
          where: { email },
        });
        if (!teacher) {
          throw new BadRequestException('Something went wrong');
        }
        otp_data = await this.otpService.generateNewOtp(
          teacher.email,
          role,
          res,
        );
        res.cookie('verification_key', otp_data.verification_key, {
          maxAge: Number(process.env.COOKIE_REFRESH_TIME),
          httpOnly: true,
        });
        return {
          success: true,
          message: otp_data.message,
        };
      case 'job_seeker':
        const student = await this.jobSeekerRepo.findOne({
          where: { email },
        });
        if (!student) {
          throw new BadRequestException('Something went wrong');
        }
        otp_data = await this.otpService.generateNewOtp(
          student.email,
          role,
          res,
        );
        res.cookie('verification_key', otp_data.verification_key, {
          maxAge: Number(process.env.COOKIE_REFRESH_TIME),
          httpOnly: true,
        });
        return {
          success: true,
          message: otp_data.message,
        };
      default:
        throw new NotFoundException("Role noto'g'ri");
    }
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto, req: Request) {
    const verificationKey = req.cookies.verification_key;
    const decodedVerificationKey = await decode(verificationKey);
    const parsedOtpPayload = JSON.parse(decodedVerificationKey);
    const { otp } = verifyOtpDto;
    const otp_details = await this.otpRepo.findOne({
      order: { created_at: 'DESC' },
      where: { email: parsedOtpPayload.email },
    });
    if (!otp_details) {
      throw new BadRequestException('To this email never send');
    }
    const currentDate = new Date();
    if (otp_details.verified) {
      throw new BadRequestException('This otp has been previously verified.');
    }
    if (otp_details.expiration_time < currentDate) {
      throw new BadRequestException('This OTP has expired.');
    }
    if (+otp_details.otp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }
    await this.otpRepo.update({ id: otp_details.id }, { verified: true });

    return {
      message: 'Congratulations, now enter new password',
    };
  }

  async newPassword(dto: NewPasswordDto, req: Request, res: Response) {
    const { confirm_password, password } = dto;
    if (confirm_password !== password) {
      throw new BadRequestException('Passwords do not match');
    }
    const verificationKey = req.cookies.verification_key;
    const decodedVerificationKey = await decode(verificationKey);
    const parsedOtpPayload = JSON.parse(decodedVerificationKey);
    switch (parsedOtpPayload.role) {
      case 'admin':
        const admin = await this.adminRepo.findOne({
          where: { email: parsedOtpPayload.email },
        });
        admin!.password_hash = await bcrypt.hash(password, 7);
        res.clearCookie('verification_key');
        return {
          success: true,
          message: 'Your password successfully changed!',
        };
      case 'hr':
        const teacher = await this.hrSpecialistRepo.findOne({
          where: { email: parsedOtpPayload.email },
        });
        teacher!.password_hash = await bcrypt.hash(password, 7);
        res.clearCookie('verification_key');
        return {
          success: true,
          message: 'Your password successfully changed!',
        };
      case 'job_seeker':
        const student = await this.jobSeekerRepo.findOne({
          where: { email: parsedOtpPayload.email },
        });
        student!.password_hash = await bcrypt.hash(password, 7);
        res.clearCookie('verification_key');
        return {
          success: true,
          message: 'Your password successfully changed!',
        };
      default:
        throw new BadRequestException('Something went wrong');
    }
  }
}
