import { z } from "zod";

const createTokenSchema = z.object({
  name: z.string(),
  symbol: z.string(),
  description: z.string(),
});

export { createTokenSchema };
