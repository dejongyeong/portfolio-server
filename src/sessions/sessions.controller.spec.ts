import { Test, TestingModule } from "@nestjs/testing";

import { PrismaModule } from "../common/prisma/prisma.module";
import { SessionsController } from "./sessions.controller";
import { SessionsService } from "./sessions.service";

describe("SessionsController", () => {
  let controller: SessionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionsController],
      providers: [SessionsService],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<SessionsController>(SessionsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
