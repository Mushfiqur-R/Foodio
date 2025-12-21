import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { CreateRoleDto } from 'src/DTOs/Role.dto';
import { CreateUserDto } from 'src/DTOs/User.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
@Injectable()
export class AdminService {
     constructor(private prisma: PrismaService, private jwtService:JwtService){}

    async createRole(data: CreateRoleDto):Promise<Role> {
    const existingRole = await this.prisma.role.findUnique({
      where: { name: data.name },
    });

    if (existingRole) {
      throw new ConflictException('Role already exists');
    }

    return this.prisma.role.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });
  }
  
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
    where: { name: 'admin' },
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


}
