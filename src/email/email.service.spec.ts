import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";

import { EmailService } from "./email.service";
import { ResendService } from "./resend/resend.service";

describe("EmailService", () => {
  let service: EmailService;

  beforeAll(() => {
    process.env.RESEND_API_KEY = "re_1234567890"; // mock the api key
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailService, ResendService, ConfigService],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
