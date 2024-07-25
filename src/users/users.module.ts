import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { USER_SERVICE } from 'src/common/constants/services';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { AuthController } from './auth.controller';

@Module({
  imports: [],
  controllers: [UsersController, AuthController],
  providers: [
    {
      provide: USER_SERVICE,
      useFactory: (configService: ConfigService): ClientProxy => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBIT_MQ_URI')],
            queue: configService.get<string>('RABBIT_MQ_USER_QUEUE'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class UsersModule {}
