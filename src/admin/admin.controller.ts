import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateRoleDto } from 'src/DTOs/Role.dto';
import { CreateUserDto } from 'src/DTOs/User.dto';
import { LoginDto } from 'src/DTOs/Login.dto';
import { AdminGuard } from 'src/auth/adminguard';

@Controller('admin')
export class AdminController {
       constructor(private readonly adminService:AdminService){}

  
  @Post('roles')
  @UseGuards(AdminGuard)
  createRole(@Body() data: CreateRoleDto) {
    return this.adminService.createRole(data);
  }
   @Post('createuser')
  createUser(@Body() data: CreateUserDto) {
    return this.adminService.createUser(data);
  } 
 
  @Post("login")
   getlogin(@Body() logindata: LoginDto) {
  return this.adminService.login(logindata.email, logindata.password);
}

}
