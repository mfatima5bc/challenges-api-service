import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3333),
  NODE_ENV: z.enum(['production', 'development']),
  KAFKA_BROKERS: z.string(),
});

export type env = z.infer<typeof envSchema>;
