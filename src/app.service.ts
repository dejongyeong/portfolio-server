import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  // constructor(private readonly config: ConfigService) {}

  getHello(): string {
    // const db = this.config.get<string>("DATABASE_URL");

    return "Hello World!";
  }
}
