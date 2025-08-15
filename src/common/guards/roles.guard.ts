// import {
//   CanActivate,
//   ExecutionContext,
//   ForbiddenException,
//   Injectable,
// } from "@nestjs/common";
// import { Reflector } from "@nestjs/core";
// import { Observable } from "rxjs";
// import { ROLES_KEY } from "../../app.constants";

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private readonly reflector: Reflector) {}

//   canActivate(
//     context: ExecutionContext
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();

//     const requiredRoles: string[] = this.reflector.getAllAndOverride(
//       ROLES_KEY,
//       [context.getHandler(), context.getClass()]
//     );

//     if (!requiredRoles || requiredRoles.length === 0) {
//       return true;
//     }

//     const user = request.user;
//     if (!user || !user.role) {
//       throw new ForbiddenException({
//         message: "Foydalanuvchi aniqlanmadi yoki roli yo'q",
//       });
//     }

//     // Agar foydalanuvchi bir nechta rolga ega bo‘lsa
//     const userRoles = Array.isArray(user.role) ? user.role : [user.role];

//     const hasPermission = userRoles.some((role: any) =>
//       requiredRoles.includes(typeof role === "string" ? role : role.value)
//     );

//     if (!hasPermission) {
//       throw new ForbiddenException({
//         message: "Sizda bu amalni bajarishga ruxsat yo'q",
//       });
//     }

//     return true;
//   }
// }

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../app.constants';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const user = req.user;
    if (user?.is_creator === true) {
      return true;
    }
    const roles = user.role;
    if (!roles) {
      throw new ForbiddenException('User role not found');
    }
    const hasAccess = requiredRoles.includes(roles);

    if (!hasAccess) {
      throw new ForbiddenException("Bu amalga ruxsat yo'q");
    }
    return true;
  }
}
