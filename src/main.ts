import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { AllExceptionsFilter } from 'additions/exception/http-exception.interceptor';
import { ResponseInterceptor } from 'additions/response/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter(new Logger()));
  app.setGlobalPrefix('api/v1');
  await app.listen(3000, () => console.log('running app '));
}
bootstrap();
