import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'teste') {
  config({ path: '.env.test' })
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
  DATABASE_CLIENT: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('⚠️ Invalid enviroment variables!', _env.error.format())

  throw new Error('Invalid enviroment variables!')
}

export const env = _env.data
