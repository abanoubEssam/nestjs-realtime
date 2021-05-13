import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from '../../shared/constants';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: IJwtPayload) {
    const user = await this._userService.findOne({_id: payload.sub , email: payload.email});
    console.log("🚀 ~ file: jwt.strategy.ts ~ line 22 ~ JwtStrategy ~ validate ~ user", user)
    if (!user) {
      throw new UnauthorizedException("Not Allowed")
    }
    return user;
  }
}
