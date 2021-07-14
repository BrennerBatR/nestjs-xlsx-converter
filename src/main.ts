import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule);

  const options = new DocumentBuilder()
    .setTitle(`Xlsx converter Api`)
    .setDescription('Back-end')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const PORT = Number(process.env.PORT) || 3000;
  const server = await app.listen(PORT, '0.0.0.0');
  server.setTimeout(1800000); // 600,000=> 10Min, 1200,000=>20Min, 1800,000=>30Min

  console.log(`Xls converter is listening on port : `, PORT);
}
bootstrap();
