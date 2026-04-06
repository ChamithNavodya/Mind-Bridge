import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

export async function loadApplication() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const logger = app.get(Logger);
  app.useLogger(logger);

  const configService = app.get(ConfigService);
  const env = configService.get<string>('NODE_ENV');

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Mind Bridge API')
    .setDescription('Mind Bridge application API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Auth', 'Authentication endpoints')
    .addTag('Health', 'Health check endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  await app.init();
  
  return { app, logger };
}

async function bootstrap() {
  const { app, logger } = await loadApplication();
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  await app.listen(port ?? 4000);
  app.enableShutdownHooks();

  logger.log(`Application is running on: http://localhost:${port}`, 'App');
  logger.log(`Swagger docs available at: http://localhost:${port}/api/docs`, 'App');
  logger.log(`Current Environment: ${configService.get<string>('NODE_ENV')}`, 'App');
}

if (require.main === module) {
  bootstrap().catch((err) => {
    console.error('Failed to start application:', err);
    process.exit(1);
  });
}
