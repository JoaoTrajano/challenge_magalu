import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_ENABLE_API_DELAY: z.string().transform((val) => val === "true"),
});

const _env = envSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_ENABLE_API_DELAY: process.env.NEXT_PUBLIC_ENABLE_API_DELAY,
});

if (!_env.success) {
  console.error("Erro nas variáveis públicas:", _env.error.format());
  throw new Error("Falha ao validar variáveis públicas.");
}

export const publicEnv = _env.data;
