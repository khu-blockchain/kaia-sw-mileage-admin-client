import type { createTokenSchema } from "./validations";

import { z } from "zod";

type ICreateTokenForm = z.infer<typeof createTokenSchema>;

export type { ICreateTokenForm };
