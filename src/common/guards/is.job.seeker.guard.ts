import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class IsJobSeekerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    if (!req.user || req.user.role !== 'jobSeeker') {
      throw new ForbiddenException({
        message: 'Faqat Job Seeker uchun ruxsat berilgan',
      });
    }

    return true;
  }
}
