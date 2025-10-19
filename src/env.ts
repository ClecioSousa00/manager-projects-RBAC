import z from "zod";

const PORT = 3333;

const envSchema = z.object({
  PORT: z.coerce.number().default(PORT),
});

export const env = envSchema.parse(process.env);
