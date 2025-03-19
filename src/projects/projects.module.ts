import { Module } from "@nestjs/common";

import { PrismaModule } from "@/prisma/prisma.module";

import { ProjectsController } from "./projects.controller";
import { ProjectsService } from "./projects.service";

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [PrismaModule],
})
export class ProjectsModule {}
