import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/DTOs/User.dto';
import { LoginDto } from 'src/DTOs/Login.dto';
import { CreateOrderDto } from 'src/DTOs/Order.dto';
import { UserGuard } from 'src/auth/userGuard';
import { MenuItem } from '@prisma/client';

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

  @Post('placeorder')
  @UseGuards(UserGuard)
  placeOrder(@Body() data: CreateOrderDto, @Req() req) {
    const userId = req.user.sub; // JWT থেকে current user id
    return this.userService.createOrder(userId, data);
  }

   @Get('orders')
  @UseGuards(UserGuard)
  getUserOrders(@Req() req): Promise<any[]> {
    const userId = req.user.sub;
    return this.userService.getUserOrders(userId);
  }

  //  @Get('menu')
  // getMenuItems(
  //   @Query('category') category?: string,
  // ): Promise<any[]> {
  //   return this.userService.getMenuItems(category);
  // }
  @Get('menu')
getMenuItems(@Query('category') category?: string): Promise<MenuItem[]> {
  return this.userService.getMenuItems(category);
}
}
