import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5000;
  try {
    await app.listen(PORT, () => console.log(`App running on port ${PORT} `));
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
