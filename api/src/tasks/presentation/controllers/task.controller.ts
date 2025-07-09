import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';

import {
  CreateTaskUseCase,
  DeleteTaskUseCase,
  FetchTasksUseCase,
  UpdateTaskStatusUseCase,
  UpdateTaskUseCase,
} from '@/tasks/application/use-cases';

import {
  CreateTaskBody,
  CreateTaskBodyPipe,
  FetchTasksQueryParams,
  FetchTasksQueryParamsPipe,
  UpdateTaskBody,
  UpdateTaskStatusBody,
} from '../pipes/validations';

@Controller('tasks')
export class TaskController {
  constructor(
    @Inject('CreateTaskUseCase')
    private readonly createTaskUseCase: CreateTaskUseCase,
    @Inject('UpdateTaskUseCase')
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    @Inject('DeleteTaskUseCase')
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
    @Inject('FetchTasksUseCase')
    private readonly fetchTasksUseCase: FetchTasksUseCase,
    @Inject('UpdateTaskStatusUseCase')
    private readonly updateTaskStatusUseCase: UpdateTaskStatusUseCase,
  ) {}

  @Post()
  @UsePipes(CreateTaskBodyPipe)
  async createTask(@Body() body: CreateTaskBody) {
    const result = await this.createTaskUseCase.execute({
      title: body.title,
    });
    if (result.isLeft()) throw new BadRequestException();

    return result.value;
  }

  @Get()
  @UsePipes(FetchTasksQueryParamsPipe)
  async fetchTasks(@Query() query: FetchTasksQueryParams) {
    const result = await this.fetchTasksUseCase.execute({
      status: query.status,
    });

    return result.value;
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() body: UpdateTaskBody) {
    const result = await this.updateTaskUseCase.execute({
      id,
      title: body.title,
    });
    if (result.isLeft()) throw new BadRequestException();

    return result.value;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTask(@Param('id') id: string) {
    const result = await this.deleteTaskUseCase.execute({ id });

    if (result.isLeft()) throw new BadRequestException();

    return result.value;
  }

  @Patch(':id')
  async patchTask(@Param('id') id: string, @Body() body: UpdateTaskStatusBody) {
    const result = await this.updateTaskStatusUseCase.execute({
      id,
      completed: body.completed,
    });
    if (result.isLeft()) throw new BadRequestException();

    return result.value;
  }
}
