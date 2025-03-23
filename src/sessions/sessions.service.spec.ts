import { Test, TestingModule } from "@nestjs/testing";

import { PrismaService } from "../common/prisma/prisma.service";
import { SessionsService } from "./sessions.service";

describe("SessionsService", () => {
  let service: SessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionsService, PrismaService],
    }).compile();

    service = module.get<SessionsService>(SessionsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
