import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  STRIPE_SECRET: string;
  STRIEP_SUCCESS_URL: string;
  STRIEP_CANCEL_URL: string;
  STRIPE_ENDPOINT_SECRET: string;
  NATS_SERVERS: string[];
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    STRIPE_SECRET: joi.string().required(),
    STRIEP_SUCCESS_URL: joi.string().required(),
    STRIEP_CANCEL_URL: joi.string().required(),
    STRIPE_ENDPOINT_SECRET: joi.string().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});
if (error) throw new Error(`PAYMENTS-MS: Config validation error: ${error.message}`);

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  stripeSecret: envVars.STRIPE_SECRET,
  striepSuccessUrl: envVars.STRIEP_SUCCESS_URL,
  striepCancelUrl: envVars.STRIEP_CANCEL_URL,
  stripeEndpointSecret: envVars.STRIPE_ENDPOINT_SECRET,
  natsServers: envVars.NATS_SERVERS,
};
