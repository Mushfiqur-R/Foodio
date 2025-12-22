import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/DTOs/User.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { CreateOrderDto } from 'src/DTOs/Order.dto';
import { MenuItem } from '@prisma/client';
@Injectable()
export class UserService {
   constructor(private prisma: PrismaService,private jwtService:JwtService){}


    async createUser(data: CreateUserDto) {
      // check duplicate email
      const existingUser = await this.prisma.user.findUnique({
        where: { email: data.email },
      });
    
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
    
      // assign default role (e.g., USER)
      const defaultRole = await this.prisma.role.findUnique({
        where: { name: 'user' },
      });
    
      if (!defaultRole) {
        throw new NotFoundException('Default role not found');
      }
    
      // hash password
      const hashedPassword = await bcrypt.hash(data.password, 10);
    
      // create user
      const user = await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
          address: data.address,
          roleId: defaultRole.id, // backend handles ID
        },
        include: { role: true }, // return role details
      });
    
      return {
        message: 'User created successfully!',
        data: user,
      };
    }

    async login(email:string,password:string){
      const user= await this.prisma.user.findUnique({
        where :{
          email
        },
        include:{role:true}
      });
      if(!user){
        throw new UnauthorizedException('Invalid credentials.')
      }

      const isMatch= await bcrypt.compare(password,user.password);
      if(!isMatch){
        throw new UnauthorizedException("Invalid Credentials");
      }
      const payload ={
        sub:user.id,
        email:user.email,
        role:user.role.name
      }
      const token = await this.jwtService.signAsync(payload,{
        secret:process.env.SECRET_KEY||'secretkey',
        expiresIn:'1d',
      })

      return {
      status: 'success',
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.name,
      },
    };
    }
   
     
     async createOrder(userId: number, data: CreateOrderDto) {
    // menuItem check
    const menuItem = await this.prisma.menuItem.findUnique({
      where: { id: data.menuItemId },
    });

    if (!menuItem) throw new NotFoundException('Menu item not found');
    if (!menuItem.isAvailable) throw new BadRequestException('Item is not available');

    const totalPrice = menuItem.price.mul(data.quantity);

    // create order + orderItem
    const order = await this.prisma.order.create({
      data: {
        userId,
        totalPrice,
        status: 'PENDING',
        orderItems: {
          create: {
            menuItemId: data.menuItemId,
            quantity: data.quantity,
            price: menuItem.price,
          },
        },
      },
      include: {
        orderItems: { include: { menuItem: true } },
        user: true,
      },
    });

    return {
      message: `${menuItem.name} is successfully ordered`,
      order,
    };
  }

  // User dashboard
  async getUserOrders(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: { include: { menuItem: true } },
        user:true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  //  async getMenuItems(category?: string): Promise<any[]> {
  //   return this.prisma.menuItem.findMany({
  //     where: {
  //       isAvailable: true,
  //       ...(category && {
  //         category: {
  //           name: {
  //             equals: category,
  //             mode: 'insensitive', // Starter == starter
  //           },
  //         },
  //       }),
  //     },
  //     include: {
  //       category: true,
  //     },
  //     orderBy: {
  //       createdAt: 'desc',
  //     },
  //   });
  // }

  async getMenuItems(category?: string): Promise<MenuItem[]> {
  const whereClause: any = { isAvailable: true };

  if (category) {
    whereClause.category = { name: { equals: category, mode: 'insensitive' } };
  }

  return this.prisma.menuItem.findMany({
    where: whereClause,
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });
}


}
