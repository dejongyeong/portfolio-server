import { Storage } from "@google-cloud/storage";
import { Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { CreateUploadDto } from "./dto/create-upload.dto";

@Injectable()
export class UploadService {
  private storage: Storage;
  private bucket: string;

  constructor(private configService: ConfigService) {
    this.storage = new Storage({
      credentials: {
        client_email: this.configService.get<string>("gcs.clientEmail"),
        private_key: this.configService
          .get<string>("gcs.privateKey")
          ?.replace(/\\n/g, "\n"),
      },
    });
    this.bucket = this.configService.get<string>("gcs.bucketName") as string;
  }

  async create(createUploadDto: CreateUploadDto) {
    const { filename } = createUploadDto;

    // generate a signed URL for the upload
    const [url] = await this.storage
      .bucket(this.bucket)
      .file(filename)
      .getSignedUrl({
        version: "v4",
        action: "write",
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
        contentType: "application/octet-stream",
      });

    return { url };
  }

  async delete(filename: string) {
    const file = this.storage.bucket(this.bucket).file(filename);
    if (!file) {
      throw new NotFoundException(`File ${filename} not found`);
    }

    await file.delete();
  }
}
