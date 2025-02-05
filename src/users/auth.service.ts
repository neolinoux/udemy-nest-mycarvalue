import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) { }
  
  async signup(email: string, password: string) {
    // check if email is available
    const users = await this.userService.find(email);

    if (users.length) {
      throw new BadRequestException('email in use');
    }

    //hash password
    //generate salt
    const salt = randomBytes(8).toString('hex');

    //hash the pass and salt together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //join the hashed and salt together
    const result = salt + '.' + hash.toString('hex');

    //create new user
    const user = await this.userService.create(email, result);

    return user;
  }

  async signin(email: string, password:string) {
    const [user] = await this.userService.find(email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = user.password.split('.');
    
    const hash = await scrypt(password, salt, 32) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    } 
    
    return user;
  }
}