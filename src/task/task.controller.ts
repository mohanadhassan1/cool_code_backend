/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Task } from './database/task.schema';

@Controller('task')
@ApiTags('task')
@ApiSecurity('JWT-auth')
export class TaskController {

  constructor(private readonly taskService: TaskService) { }

  // async create(@Body(ValidationPipe) createTaskDto: CreateTaskDto, @Param("userId") _id : string) {
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.create(createTaskDto);
  }

  @Get()
  async findAll(): Promise<Task[]> {
    return await this.taskService.findAll();
  }

  @Get("/findAllCompleted/:userId")
  async findAllTasksByUserCompleted(@Param("id") _id: string) {
    return await this.taskService.findAllTasksByUserCompleted(_id);
  }

  @Get("/findAllNotCompleted/:userId")
  async findAllTasksByUserNotCompleted(@Param("id") _id: string) {
    return await this.taskService.findAllTasksByUserNotCompleted(_id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: any): Promise<Task> {
    await this.taskService.update(id, updateTaskDto);

    const updatedTask = await this.taskService.findTaskById(id);
    if (!updatedTask) {
      throw new Error('Task not found');
    }
    return updatedTask;
  }

  @Delete(':id')
  async remove(@Param('id') _id: string) {
    await this.taskService.remove(_id);
    return "Task is successfully removed";
  }
  
}
