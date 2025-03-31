import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateUploadDto } from "./dto/create-upload.dto";
import { UploadService } from "./upload.service";

@Controller({ path: "upload", version: "1" })
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async upload(@Body() createUploadDto: CreateUploadDto) {
    return await this.uploadService.create(createUploadDto);
  }
}
