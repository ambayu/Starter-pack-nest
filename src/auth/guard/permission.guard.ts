// src/common/guards/permission.guard.ts
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from 'src/common/decorators/permission.decorator';



@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
            PERMISSIONS_KEY,
            [context.getHandler(), context.getClass()],
        );
        if (!requiredPermissions) {
            return true; // kalau tidak ada permission spesifik, lewati
        }

        const { user } = context.switchToHttp().getRequest();
        if (!user) {
            throw new ForbiddenException('User not found in request');
        }

        // misalnya token JWT user sudah punya property permissions: string[]
        const userPermissions = user.permissions || [];

        const hasPermission = requiredPermissions.every((perm) =>
            userPermissions.includes(perm),
        );

        if (!hasPermission) {
            throw new ForbiddenException('Insufficient permissions');
        }

        return true;
    }
}
