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

    if (!req.user || req.user.role !== 'job_seeker') {
      throw new ForbiddenException({
        message: 'Faqat Hr uchun ruxsat berilgan',
      });
    }

    return true;
  }
}
