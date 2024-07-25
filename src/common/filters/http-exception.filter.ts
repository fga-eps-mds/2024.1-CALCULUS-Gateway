import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class RpcExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(RpcExceptionsFilter.name);

  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    try {
      const excep: any = exception;
      console.log(`exception: ${JSON.stringify(exception)}`);

      this.logger.error(
        `Http Status: ${excep.statusCode} Error Message: ${JSON.stringify(excep.message)} `,
      );

      response.status(excep.statusCode).json({
        timestamp: new Date().toISOString(),
        path: request.url,
        error: excep.message,
      });
    } catch (e) {
      this.logger.error(`Exception: ${JSON.stringify(e)}`);
      response.status(500).json({
        timestamp: new Date().toISOString(),
        path: request.url,
        error: 'Internal Server Error',
      });
    }
  }
}
