import { Module } from "@nestjs/common";

import { PrismaModule } from "../common/prisma/prisma.module";
import { SessionsController } from "./sessions.controller";
import { SessionsService } from "./sessions.service";

@Module({
  controllers: [SessionsController],
  providers: [SessionsService],
  imports: [PrismaModule],
})
export class SessionsModule {}
