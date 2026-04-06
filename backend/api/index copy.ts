// import { NestFactory } from '@nestjs/core';
// import { AppModule } from '../src/app.module';
// import type { VercelRequest, VercelResponse } from '@vercel/node';

// let cachedApp: any = null;

// export default async function handler(req: VercelRequest, res: VercelResponse) {
//   if (!cachedApp) {
//     cachedApp = await NestFactory.create(AppModule);
//     cachedApp.enableCors({
//       origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
//       credentials: true,
//     });
//     await cachedApp.init();
//   }

//   const instance = cachedApp.getHttpAdapter().getInstance();
//   instance(req, res);
// }
