import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';
import * as session from 'express-session';
import { DataSource } from 'typeorm';
import { Session } from './user/Session';
import { TypeormStore } from 'connect-typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT;
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [`http://localhost/${process.env.FRONTEND_HOST_ADDRESS}`],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());

  const dataSource = app.get(DataSource);
  const sessionRepository = dataSource.getRepository(Session);

  app.use(
    session({
      name: 'ATTAI_PAY_SESSION_ID',
      secret: process.env.COOKIE_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 3600000 * 24,
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  try {
    await app.listen(PORT, () =>
      console.log(`${process.env.APP_NAME} running on port ${PORT} `),
    );
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
