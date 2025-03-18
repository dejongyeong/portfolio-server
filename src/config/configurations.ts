import { registerAs } from "@nestjs/config";

const AppConfig = registerAs("app", () => ({
  env: process.env.NODE_ENV,
  port: Number(process.env.PORT),
  baseUrl: process.env.BASE_URL,
}));

const DbConfig = registerAs("database", () => ({
  // refactor this to your database configuration
  url: process.env.DATABASE_URL,
}));

export const configurations = [AppConfig, DbConfig];
