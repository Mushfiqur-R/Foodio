import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    // 🔹 Global ValidationPipe enable
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // শুধু DTO তে define করা properties accept করবে
      forbidNonWhitelisted: true, // extra properties থাকলে error দিবে
      transform: true,        // automatically DTO type এ convert করবে
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
