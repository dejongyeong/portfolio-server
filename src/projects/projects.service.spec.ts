import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { PrismaService } from "../common/prisma/prisma.service";
import { ProjectsService } from "./projects.service";

describe("ProjectsService", () => {
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: PrismaService,
          useValue: {
            project: {
              findMany: vi.fn(),
              findUnique: vi.fn(),
              create: vi.fn(),
              update: vi.fn(),
              delete: vi.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
