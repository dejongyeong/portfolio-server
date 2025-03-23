import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

import { SessionsService } from "../../sessions/sessions.service";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh",
) {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
    private readonly sessionsService: SessionsService,
  ) {
    const secret = configService.get<string>("auth.jwtRefreshSecret");
    if (!secret) {
      throw new Error("JWT_REFRESH_SECRET is not defined in environment");
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          // const authHeader = request.headers.authorization;
          // if (authHeader && authHeader.split(" ")[0] === "Bearer") {
          //   return authHeader.split(" ")[1];
          // }

          return request?.cookies?.refresh_token as string;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: secret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: { sub: string }) {
    const user = await this.authService.validateJwtUser(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }

    const token = await this.sessionsService.validateRefreshToken(user.id, req);
    if (!token) {
      throw new UnauthorizedException();
    }

    // decoded refresh token
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await this.authService.verifyRefreshToken(token);
    if (!data) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    return { ...payload, token };
  }
}
