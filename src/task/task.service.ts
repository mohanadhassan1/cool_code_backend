/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './database/task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {

  // private task: Task[] = [];

  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) { }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new this.taskModel(createTaskDto);
    return await task.save();
  }

  async findAll(): Promise<Task[]> {
    return await this.taskModel.find().exec();
  }
  
  async findTaskById(_id: string) {
    return await this.taskModel.findById( _id);
  }

  async findAllTasksByUserCompleted(_id: string) {
    return await this.taskModel.find({ relations: ["user"], where: { user: { id: _id }, completed: true } });
  }

  async findAllTasksByUserNotCompleted(_id: string) {
    return await this.taskModel.find({ relations: ["user"], where: { user: { id: _id }, completed: false } });
  }

  async update(_id: string, task: Task): Promise<Task> {
    return await this.taskModel.findByIdAndUpdate(_id, task);
  }

  async remove(_id: string) {
    return await this.taskModel.findByIdAndDelete(_id);
  }
}
