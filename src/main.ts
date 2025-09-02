import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.enableCors({
    origin: 'http://localhost:5173', // alamat frontend kamu (React)
    credentials: true, // kalau kamu pakai cookie atau token
  });
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 App running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
