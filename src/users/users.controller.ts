import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Controller('api/v1/users')
export class UsersController {

  private readonly logger = new Logger(UsersController.name)
  private userProxy: ClientProxy;

  constructor() {
    this.userProxy = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin@localhost:5672'],
        queue: 'user-service',
      }
    })

  }


  @Post()
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userProxy.send('user-created', createUserDto)
  }
}
