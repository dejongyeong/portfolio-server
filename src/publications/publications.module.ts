import { Module } from "@nestjs/common";

import { PrismaModule } from "@/prisma/prisma.module";

import { PublicationsController } from "./publications.controller";
import { PublicationsService } from "./publications.service";

@Module({
  controllers: [PublicationsController],
  providers: [PublicationsService],
  imports: [PrismaModule],
})
export class PublicationsModule {}
