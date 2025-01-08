import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3000),
  NODE_ENV: z.enum(['production', 'development']),
  KAFKA_BROKERS: z.string()
});

export type env = z.infer<typeof envSchema>;