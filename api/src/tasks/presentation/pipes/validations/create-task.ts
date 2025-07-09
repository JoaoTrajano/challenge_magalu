import { z } from 'zod';

import { ZodValidationPipe } from '@/shared/pipes/zod-validation';

const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
});

export type CreateTaskBody = z.infer<typeof createTaskSchema>;

export const CreateTaskBodyPipe = new ZodValidationPipe(createTaskSchema);
