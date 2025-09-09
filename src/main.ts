import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips properties not in the DTO
      forbidNonWhitelisted: true, // throws error if extra fields are present
      transform: true, // automatically transform payloads to DTO instances
    }),
  );
  app.use(cookieParser());

  await app.listen(port);
  console.log(`server started on port ${port}`);
}
bootstrap();
