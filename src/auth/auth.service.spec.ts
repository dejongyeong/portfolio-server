import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";

import { PrismaService } from "../common/prisma/prisma.service";
import { EmailService } from "../email/email.service";
import { ResendService } from "../email/resend/resend.service";
import { SessionsService } from "../sessions/sessions.service";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
  let service: AuthService;

  beforeAll(() => {
    process.env.RESEND_API_KEY = "re_1234567890"; // mock the api key
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        PrismaService,
        JwtService,
        EmailService,
        ResendService,
        UsersService,
        ConfigService,
        SessionsService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
