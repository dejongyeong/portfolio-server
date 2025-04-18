import { Module } from "@nestjs/common";

import { PrismaModule } from "../common/prisma/prisma.module";
import { UploadService } from "../upload/upload.service";
import { ProjectsController } from "./projects.controller";
import { ProjectsService } from "./projects.service";

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, UploadService],
  imports: [PrismaModule],
})
export class ProjectsModule {}
