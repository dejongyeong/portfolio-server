import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger
  const config = new DocumentBuilder()
    .setTitle("Portfolio")
    .setDescription("Portfolio API")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  // env config
  const configService = app.get(ConfigService);

  app.enableCors();
  await app.listen(configService.get<number>("app.port", 3000));
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
