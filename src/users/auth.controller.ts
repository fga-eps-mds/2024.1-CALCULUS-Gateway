import { Body, Controller, Inject, Logger, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICE } from 'src/common/constants/services';
import { LoginDto } from './dto/login.dto';

@Controller('api/v1/auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(@Inject(USER_SERVICE) private readonly userProxy: ClientProxy) {}
  
  @Post()
  createUser(@Body() loginDto: LoginDto) {
    this.logger.log(`loginDto: ${JSON.stringify(loginDto)}`);
    return this.userProxy.send('login', loginDto);
  }

}
