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
  // our password is stored in the .env file as this project just has a single user
  email: process.env.APP_EMAIL,
  password: process.env.APP_PASSWORD,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
}));

export const configurations = [AppConfig, DbConfig, AuthConfig];
