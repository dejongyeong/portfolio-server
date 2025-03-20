import { Test, TestingModule } from "@nestjs/testing";

import { PrismaModule } from "../common/prisma/prisma.module"; // Import the module containing PrismaService
import { PublicationsController } from "./publications.controller";
import { PublicationsService } from "./publications.service";

describe("PublicationsController", () => {
  let controller: PublicationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicationsController],
      providers: [PublicationsService],
      imports: [PrismaModule], // add PrismaModule to imports
    }).compile();

    controller = module.get<PublicationsController>(PublicationsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
