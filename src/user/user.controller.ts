/* eslint-disable prettier/prettier */

import { Controller, Get, Post, Patch, Body, Param, Delete, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './database/user.schema';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { Error } from 'mongoose';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post("/signup")
  async signup(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return await this.userService.signup(createUserDto);
  }

  @Post("/login")
  async login(@Body() user: User) {
    return await this.userService.login(user.email, user.password);
  }

  // @ApiSecurity('JWT-auth')
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  // @ApiSecurity('JWT-auth')
  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.findUserById(id);
  }

  // @Get(':email')
  // async findUserByEmail(@Param('email') email: string): Promise<User> {
  //   return await this.userService.findUserByEmail(email);
  // }


  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: any): Promise<User> {
    await this.userService.update(id, updateUserDto);

    const updatedUser = await this.userService.findUserById(id);
    if (!updatedUser) {
      throw new Error('User not found');
    }
    return updatedUser;
  }

  @ApiSecurity('JWT-auth')
  @Delete(':id')
  async remove(@Param('id') id: string) {

     await this.userService.remove(id);
     return "This user has been removed"
  }

}

