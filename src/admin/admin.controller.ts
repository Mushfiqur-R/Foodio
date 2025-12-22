import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateRoleDto } from 'src/DTOs/Role.dto';
import { CreateUserDto } from 'src/DTOs/User.dto';
import { LoginDto } from 'src/DTOs/Login.dto';
import { AdminGuard } from 'src/auth/adminguard';
import { CreateCategoryDto } from 'src/DTOs/Catagory.dto';
import { Category } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMenuItemDto, UpdateMenuItemDto } from 'src/DTOs/MenuItem.dto';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

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

  @Post('createcategory')
  @UseGuards(AdminGuard)
  createCategory(@Body() data: CreateCategoryDto):Promise<{ message: string; data: Category }> {
    return this.adminService.createCategory(data);
  }
  
  @Get('categories')
  @UseGuards(AdminGuard)
    async getallcatagory(){
        return this.adminService.getAllCategory();
    }
 @Delete('deletecategory/:id')
@UseGuards(AdminGuard)
deleteCategory(@Param('id', ParseIntPipe) id: number) {
  return this.adminService.deleteCategory(id);
}

@Post('createmenuitem')
  @UseGuards(AdminGuard)
  @UseInterceptors(
  FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/menu',
      filename: (req, file, cb) => {
        const unique =
          Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, unique + extname(file.originalname));
      },
    }),
  }),
)
  createMenuItem(
    @Body() data: CreateMenuItemDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.adminService.createMenuItem(data, image);
  }
  
 @Delete('menuitem/:id')
  @UseGuards(AdminGuard)
  async deleteMenuItem(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.adminService.deleteMenuItem(id);
  }
  
  @Patch('updatemenuitem/:id')
  @UseGuards(AdminGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads/menu'), // dist ব্যবহার হবে না
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async updateMenuItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateMenuItemDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.adminService.updateMenuItem(id, data, image);
  }
  
  
   
}
