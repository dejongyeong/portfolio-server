import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    configService: ConfigService,
    private authService: AuthService,
  ) {
    const jwtSecret = configService.get<string>("auth.jwtSecret");
    if (!jwtSecret) {
      throw new InternalServerErrorException(
        "JWT_SECRET is not defined in environment variables",
      );
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: { sub: string }) {
    // check is done when calling validateJwtUser, so no need to check here
    const user = await this.authService.validateJwtUser(payload.sub);

    // if (!user) {
    //   throw new UnauthorizedException();
    // }

    return user;
  }
}
