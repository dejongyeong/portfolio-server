import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  // constructor(private readonly config: ConfigService) {}

  getHello(): string {
    // const port = this.config.get<number>("PORT");

    return "Hello World!";
  }
}
