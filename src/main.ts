import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('My own backend api test and studies')
    .setDescription("An project to learn nestJS and decorators, just like others api frameworks")
    .setVersion('0.0.1')
    .addTag('Studies')
    .build()

  app.enableCors()
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
