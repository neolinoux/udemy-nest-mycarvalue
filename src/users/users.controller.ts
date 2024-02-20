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
  // UseInterceptors,
  ClassSerializerInterceptor,
  Session,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { Serialize } from 'src/serialize/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorator/current-user.decorator';
import { User } from './entities/user.entity';
// import { CurrentUserInterceptor } from './interceptor/current-user.interceptor';
  
@Serialize(UserDto)
@Controller('auth')
// @UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private AuthService: AuthService
  ) { }

  @Get('colors/:color')
  setColor(@Param('color') color: string, @Session() session: any){
    session.color = color;
  }

  @Get('colors')
  getColor(@Session() session :any) {
    return session.color;
  }

  @Post('signup')
  async createUser(@Body() body: CreateUserDto, @Session() session :any) {
    const user = await this.AuthService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('signin')
  async signin(@Body() body: CreateUserDto, @Session() session :any) {
    const user = await this.AuthService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  // @Get('whoami')
  // WhoAmI(@Session() session:any) {
  //   return this.usersService.findOne(session.userId);
  // }

  @Get('whoami')
  WhoAmI(@CurrentUser() user: User) {
    return user;
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
