import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it, vi } from "vitest"; // Update imports for Vitest

import { PrismaService } from "../common/prisma/prisma.service";
import { PublicationsService } from "./publications.service";

describe("PublicationsService", () => {
  let service: PublicationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PublicationsService,
        {
          provide: PrismaService,
          useValue: {
            // Mock PrismaService methods as needed
            publication: {
              findMany: vi.fn(), // Use vi.fn() for Vitest
              findUnique: vi.fn(),
              create: vi.fn(),
              update: vi.fn(),
              delete: vi.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<PublicationsService>(PublicationsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
