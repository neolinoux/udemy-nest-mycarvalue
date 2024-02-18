import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  createUser(@Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto.email, createUserDto.password);
  }

  
}
