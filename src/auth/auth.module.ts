import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { PrismaModule } from "../common/prisma/prisma.module";
import { EmailModule } from "../email/email.module";
import { EmailService } from "../email/email.service";
import { ResendService } from "../email/resend/resend.service";
import { SessionsService } from "../sessions/sessions.service";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JwtRefreshStrategy } from "./strategies/jwt-refresh.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

// reference: https://www.prisma.io/blog/nestjs-prisma-authentication-7D056s1s0k3l

@Module({
  controllers: [AuthController],
  imports: [
    PrismaModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("auth.jwtSecret"),
        signOptions: {
          expiresIn: configService.get<string | number>("auth.jwtExpiresIn"), // short-lived access token
        },
      }),
    }),
    UsersModule,
    EmailModule,
  ],
  providers: [
    AuthService,
    SessionsService,
    EmailService,
    ResendService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
})
export class AuthModule {}
