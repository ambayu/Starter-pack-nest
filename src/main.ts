import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (process.env.USE_GLOBAL_PREFIX === 'true') {
    app.setGlobalPrefix('api');
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.enableCors({
    // origin: 'http://localhost:5173', // alamat frontend kamu (React)
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://223.25.104.108:86',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // kalau kamu pakai cookie atau token
  });
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 App running on p://localhost:${port}`, 'Bootstrap');
}
bootstrap();
