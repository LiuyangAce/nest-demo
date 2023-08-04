import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { logger } from './middleware/logger.middleware';
import { HttpExceptionFilter } from './exception/http-exception.filter';
// import { ValidationPipe } from './pipe/validation.pipe';

import { swaggerInit } from 'src/utils/swagger';
import { Validate } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 将中间件设置到全局控制器
  // app.use(logger)

  // 设置全局过滤器
  /**
   * 该 useGlobalFilters() 方法
   * 不会为网关和混合应用程序设置过滤器。
   */
  // 这里的全局设置 实际上不属于任何一个模块
  // 想要他属于任意模块 见app.module.ts
  // app.useGlobalFilters(new HttpExceptionFilter())

  // 设置全局管道
  // 同上 不会为网关和混合应用程序设置过滤器。
  app.useGlobalPipes(new ValidationPipe());

  swaggerInit(app);
  await app.listen(3000);
}
bootstrap();
