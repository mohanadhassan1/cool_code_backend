/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './database/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { compare } from 'bcrypt';
// import * as jwt from 'jsonwebtoken';



@Injectable()
export class UserService {

  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }


  async signup(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.linkedinURL = createUserDto.linkedinURL;
    return await user.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findUserById(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  // async findUserByEmail(email: string): Promise<User> {
  //   return await this.userModel.find({ email }).exec();
  // }

  async login(email: string, password: string) {

    const user = await this.userModel.findOne({ email }).select('+password').exec();
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error('Wrong password');
    }
    // const token = jwt.sign({ email: user.email }, 'mySecert Key', { expiresIn: '1d' });
    // return { token };

    return {user};
  }


  async update(_id: string, updatedUser: User) {
    return await this.userModel.findByIdAndUpdate({ _id }, { $set: updatedUser }).exec();
  }
  
  async remove(id: string){
    return await this.userModel.findByIdAndDelete({ _id: id }).exec();
  }
}



