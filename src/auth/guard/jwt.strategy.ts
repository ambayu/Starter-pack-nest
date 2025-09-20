import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // ambil token dari header Authorization
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret', // harus sama persis// samakan dengan secret di AuthService.sign()
    });
  }

  async validate(payload: any) {
    // payload berasal dari this.jwtService.sign(payload)
    // return ini otomatis disimpan ke req.user
    return {
      id: payload.sub,
      username: payload.username, 
      roles: payload.roles,
      permissions: payload.permissions,
      nip: payload.nip
    };
  }
}
