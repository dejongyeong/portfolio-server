import * as Joi from "joi";

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "production", "test")
    .default("development"),
  PORT: Joi.number().default(3000),
  BASE_URL: Joi.string().default("http://localhost"),
  DATABASE_URL: Joi.string().optional(),
  APP_EMAIL: Joi.string().email().required(),
  APP_PASSWORD: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.alternatives(Joi.string(), Joi.number()).default("7d"),
});
