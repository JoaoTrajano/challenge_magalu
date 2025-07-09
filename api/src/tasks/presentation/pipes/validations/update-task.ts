import { z } from 'zod';

import { ZodValidationPipe } from '@/shared/pipes/zod-validation';

const updateTaskBodySchema = z.object({
  title: z.string().optional(),
});

export type UpdateTaskBody = z.infer<typeof updateTaskBodySchema>;

export const UpdateTaskBodyPipe = new ZodValidationPipe(updateTaskBodySchema);
