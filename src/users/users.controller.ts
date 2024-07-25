import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Logger,
  Query,
  Inject,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { USER_SERVICE } from 'src/common/constants/services';

@Controller('api/v1/users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(@Inject(USER_SERVICE) private readonly userProxy: ClientProxy) {}

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    this.logger.log(`createUserDto: ${JSON.stringify(createUserDto)}`);
    return this.userProxy.send('user-created', createUserDto);
  }

  @Get()
  getUsers() {
    return this.userProxy.send('user-get-all', '');
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userProxy.send('user-get-by-id', id);
  }

  @Get('verify')
  verifyUser(@Query('token') token: string) {
    this.logger.log(`token: ${token}`);
    return this.userProxy.send('user-verify', {token});
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: string) {
    return this.userProxy.send('user-delete-by-id', id);
  }
}
