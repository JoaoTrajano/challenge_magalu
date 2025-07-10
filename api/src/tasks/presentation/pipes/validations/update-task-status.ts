import { z } from 'zod';

import { ZodValidationPipe } from '@/shared/pipes/zod-validation';
import { TaskStatus } from '@/tasks/domain/entities/task.entity';

const updateTaskStatusBodySchema = z.object({
  newStatus: z.nativeEnum(TaskStatus),
});

export type UpdateTaskStatusBody = z.infer<typeof updateTaskStatusBodySchema>;

export const UpdateTaskStatusBodyPipe = new ZodValidationPipe(
  updateTaskStatusBodySchema,
);
