import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/DTOs/User.dto';
import { LoginDto } from 'src/DTOs/Login.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

      @Post('createuser')
      createUser(@Body() data: CreateUserDto) {
        return this.userService.createUser(data);
      } 

      @Post("login")
      getlogin(@Body() logindata: LoginDto) {
      return this.userService.login(logindata.email, logindata.password);
}
}
