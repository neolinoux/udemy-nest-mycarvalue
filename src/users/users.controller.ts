import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { Serialize } from 'src/serialize/serialize.interceptor';
  
@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('signup')
  createUser(@Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto.email, createUserDto.password);
  }

  // @UseInterceptors(new SerializeInterceptor(UserDto))
  @Get(':id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email:string) {
    return this.usersService.find(email);
  }

  @Delete(':id')
  removeUser(@Param('id') id:string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch(':id')
  updateUser(@Param('id') id:string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
