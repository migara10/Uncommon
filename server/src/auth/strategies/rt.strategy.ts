import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_secret_key', // Replace with your actual secret key
    });
  }

  async validate(payload: any) {
    // Implement validation logic here
    const user = ''
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
