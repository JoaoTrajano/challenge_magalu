import { z } from 'zod';

import { ZodValidationPipe } from '@/shared/pipes/zod-validation';
import { TaskStatus } from '@/tasks/domain/entities/task.entity';

const fetchTasksQueryParamsSchema = z.object({
  status: z.nativeEnum(TaskStatus).optional(),
});

export type FetchTasksQueryParams = z.infer<typeof fetchTasksQueryParamsSchema>;

export const FetchTasksQueryParamsPipe = new ZodValidationPipe(
  fetchTasksQueryParamsSchema,
);
