import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';

@Injectable()
export class CompositeAuthGuard implements CanActivate {
  private jwtAuthGuard = new JwtAuthGuard();
  private rolesGuard = new RolesGuard(new (require('@nestjs/core').Reflector)());

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // cek JWT dulu
    const jwtValid = await Promise.resolve(this.jwtAuthGuard.canActivate(context));
    if (!jwtValid) return false;

    // lalu cek role
    const rolesValid = await Promise.resolve(this.rolesGuard.canActivate(context));
    if (!rolesValid) return false;

    return true;
  }
}
