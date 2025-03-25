import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { ResendService } from "./resend.service";

@Module({
  imports: [],
  providers: [ResendService, ConfigService],
  exports: [ResendService],
})
export class ResendModule {}
