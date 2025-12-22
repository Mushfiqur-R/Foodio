import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    // 🔹 Global ValidationPipe enable
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // শুধু DTO তে define করা properties accept করবে
      forbidNonWhitelisted: true, // extra properties থাকলে error দিবে
      transform: true,        // automatically DTO type এ convert করবে
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads' });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
