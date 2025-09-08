import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

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

  await app.listen(port);
  console.log(`server started on port ${port}`);
}
bootstrap();
