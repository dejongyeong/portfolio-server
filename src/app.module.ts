import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./common/prisma/prisma.module";
import { configurations } from "./config/configurations";
import { envValidationSchema } from "./config/env.validation";
import { ProjectsModule } from "./projects/projects.module";
import { PublicationsModule } from "./publications/publications.module";
import { SessionsModule } from "./sessions/sessions.module";
import { SessionsService } from "./sessions/sessions.service";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configurations,
      validationSchema: envValidationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    ThrottlerModule.forRoot({ throttlers: [{ ttl: 60000, limit: 10 }] }), // 10 requests per minute; ttl in ms
    PrismaModule,
    PublicationsModule,
    ProjectsModule,
    AuthModule,
    UsersModule,
    SessionsModule,
  ],
  controllers: [AppController],
  providers: [AppService, SessionsService],
})
export class AppModule {}
