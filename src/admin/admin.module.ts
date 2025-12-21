import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule,JwtModule.register({
      secret: process.env.SECRET_KEY || 'secretkey',
      signOptions: { expiresIn: '1d' },
    }),],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}
