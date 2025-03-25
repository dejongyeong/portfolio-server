import { ClassSerializerInterceptor, VersioningType } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpAdapterHost, NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import { AppModule } from "./app.module";
import { PrismaClientExceptionFilter } from "./prisma-client-exception/prisma-client-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // route versioning
  app.enableVersioning({ type: VersioningType.URI });

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

  // helmet for security
  app.use(helmet());

  // handling prisma exceptions
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  // interceptors to exclude password
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // cookie-parser
  app.use(cookieParser());

  app.enableCors();
  await app.listen(configService.get<number>("app.port", 8080));
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
