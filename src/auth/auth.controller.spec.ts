import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";

import { PrismaModule } from "../common/prisma/prisma.module";
import { EmailService } from "../email/email.service";
import { ResendService } from "../email/resend/resend.service";
import { SessionsService } from "../sessions/sessions.service";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

describe("AuthController", () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        ConfigService,
        SessionsService,
        EmailService,
        ResendService,
      ],
      imports: [
        PrismaModule,
        PassportModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: "7d" },
        }),
        UsersModule,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
