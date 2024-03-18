/* eslint-disable prettier/prettier */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { JwtAuthGuard } from './auth/guard/jwt.guard';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new JwtAuthGuard())
  
  // const options = new DocumentBuilder()
  // .setTitle("TaskManagement")
  // .setDescription("Task Management using NestJS")
  // .setVersion("1.0")
  // .addBearerAuth({
  //   type: "http",
  //   scheme: "bearer",
  //   bearerFormat: "JWT",
  //   name: "JWT",
  //   description: "Enter JWT Token",
  //   in: "header",
  // }, "JWT-auth").build()

  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(5000);
  
}
bootstrap();
