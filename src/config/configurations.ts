import { registerAs } from "@nestjs/config";

const AppConfig = registerAs("app", () => ({
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  baseUrl: process.env.BASE_URL,
}));

const DbConfig = registerAs("database", () => ({
  url: process.env.DATABASE_URL,
}));

const AuthConfig = registerAs("auth", () => ({
  // our password is stored in the .env file
  // this project just has a single user
  email: process.env.APP_EMAIL,
  password: process.env.APP_PASSWORD,
}));

export const configurations = [AppConfig, DbConfig, AuthConfig];
