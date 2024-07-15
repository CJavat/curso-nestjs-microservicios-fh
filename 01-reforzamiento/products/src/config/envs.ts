import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
}

//* Esquema de validación.
const envsSchema = joi
  .object({
    PORT: joi.number().required(),
  })
  .unknown(true);

const { value, error } = envsSchema.validate(process.env);
if (error) throw new Error(`Config validation error: ${error.message}`);

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
};
