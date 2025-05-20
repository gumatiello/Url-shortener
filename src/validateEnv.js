import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.coerce.number(),
  ORIGIN: z.string().url(),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('Config your .env to run!!!')
  console.error(parsed.error.format())
  process.exit(1)
}
