import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Category, Role } from '@prisma/client';
import { CreateRoleDto } from 'src/DTOs/Role.dto';
import { CreateUserDto } from 'src/DTOs/User.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { CreateCategoryDto } from 'src/DTOs/Catagory.dto';
import { CreateMenuItemDto, UpdateMenuItemDto } from 'src/DTOs/MenuItem.dto';
import { join } from 'path';
import { existsSync, unlinkSync } from 'fs';
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
async createCategory(data: CreateCategoryDto):Promise<{message: string; data: Category}> {
    const existing = await this.prisma.category.findUnique({
      where: { name: data.name },
    });

    if (existing) {
      throw new ConflictException('Category already exists');
    }

    const category = await this.prisma.category.create({
      data: { name: data.name },
    });

    return {
      message: 'Category created successfully!',
      data: category,
    };
  }
 async getAllCategory() {
  return this.prisma.category.findMany();
}

async deleteCategory(id: number) {
  const category = await this.prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    throw new NotFoundException('Category not found');
  }

  await this.prisma.category.delete({
    where: { id },
  });

  return {
    message: 'Category deleted successfully',
  };
}

 async createMenuItem(data: CreateMenuItemDto, image?: Express.Multer.File) {
    // find category by name
    const category = await this.prisma.category.findUnique({
      where: { name: data.categoryName },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const imageUrl = image ? `/uploads/menu/${image.filename}` : null;

    const menuItem = await this.prisma.menuItem.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        categoryId: category.id,
        imageUrl,
      },
      include: { category: true },
    });

    return {
      message: 'Menu item created successfully!',
      data: menuItem,
    };
  }
  
  async deleteMenuItem(id: number): Promise<{ message: string }> {
    const menuItem = await this.prisma.menuItem.findUnique({ where: { id } });

    if (!menuItem) {
      throw new NotFoundException('Menu item not found');
    }

    if (menuItem.imageUrl) {
      const filePath = join(process.cwd(), menuItem.imageUrl);
      if (existsSync(filePath)) {
        unlinkSync(filePath);
      }
    }

    await this.prisma.menuItem.delete({ where: { id } });

    return { message: 'Menu item deleted successfully!' };
  }
 
   async updateMenuItem(
    id: number,
    data: UpdateMenuItemDto,
    image?: Express.Multer.File,
  ): Promise<{ message: string; data: any }> {
    const menuItem = await this.prisma.menuItem.findUnique({ where: { id } });

    if (!menuItem) {
      throw new NotFoundException('Menu item not found');
    }

    // category update
    let categoryId = menuItem.categoryId;
    if (data.categoryName) {
      const category = await this.prisma.category.findUnique({ where: { name: data.categoryName } });
      if (!category) throw new NotFoundException('Category not found');
      categoryId = category.id;
    }

    // image update
    let imageUrl = menuItem.imageUrl;
    if (image) {
      if (menuItem.imageUrl) {
        const filePath = join(process.cwd(), menuItem.imageUrl);
        if (existsSync(filePath)) unlinkSync(filePath);
      }
      imageUrl = `/uploads/menu/${image.filename}`;
    }
     let isAvailable = menuItem.isAvailable; // default current value
    if (data.isAvailable !== undefined) {
  // form-data theke string "true"/"false" ke boolean e convert
  isAvailable = data.isAvailable === 'true';
}

    const updated = await this.prisma.menuItem.update({
      where: { id },
      data: {
     name: data.name,
    description: data.description,
    price: data.price,
    categoryId,
    imageUrl,
    isAvailable: data.isAvailable !== undefined ? data.isAvailable === 'true' : menuItem.isAvailable
      },
      include: { category: true },
    });

    return {
      message: 'Menu item updated successfully!',
      data: updated,
    };
  }

}
