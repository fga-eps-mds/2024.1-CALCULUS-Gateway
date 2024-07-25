import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RpcExceptionsFilter } from './common/filters/http-exception.filter';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { ConfigService } from '@nestjs/config';
// import { ResponseInterceptor } from './common/interceptors/response.interceptor';

const configService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalFilters(new RpcExceptionsFilter());
  await app.listen(configService.get<string>('PORT') || 8080);
}
bootstrap();
