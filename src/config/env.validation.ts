import * as Joi from "joi";

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "production", "test")
    .default("development"),
  PORT: Joi.number().default(8080),
  BASE_URL: Joi.string().default("http://localhost"),
  FRONTEND_URL: Joi.string().default("http://localhost:3000"),
  DATABASE_URL: Joi.string().optional(),
  APP_EMAIL: Joi.string().email().required(),
  APP_PASSWORD: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.alternatives(Joi.string(), Joi.number()).default("7d"),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_REFRESH_EXPIRES_IN: Joi.alternatives(Joi.string(), Joi.number()).default(
    "30d",
  ),
  RESEND_API_KEY: Joi.string().required(),
  GCS_BUCKET_NAME: Joi.string().required(),
  GCS_CLIENT_EMAIL: Joi.string().required(),
  GCS_PRIVATE_KEY: Joi.string().required(),
});
