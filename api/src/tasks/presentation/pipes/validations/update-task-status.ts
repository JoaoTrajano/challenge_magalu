import { z } from 'zod';

import { ZodValidationPipe } from '@/shared/pipes/zod-validation';

const updateTaskStatusBodySchema = z.object({
  completed: z.boolean(),
});

export type UpdateTaskStatusBody = z.infer<typeof updateTaskStatusBodySchema>;

export const UpdateTaskStatusBodyPipe = new ZodValidationPipe(
  updateTaskStatusBodySchema,
);
