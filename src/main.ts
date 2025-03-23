import { ClassSerializerInterceptor } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpAdapterHost, NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cookieParser from "cookie-parser";

import { AppModule } from "./app.module";
import { PrismaClientExceptionFilter } from "./prisma-client-exception/prisma-client-exception.filter";

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

  // handling prisma exceptions
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  // interceptors to exclude password
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // cookie-parser
  app.use(cookieParser());

  app.enableCors();
  await app.listen(configService.get<number>("app.port", 3000));
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
