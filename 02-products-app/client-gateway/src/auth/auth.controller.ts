import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { AuthGuard } from './guards/auth.guard';
import { Token, User } from './decorators';
import { CurrentUser } from './interfaces/current-user.interface';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    try {
      const auth = await firstValueFrom(
        this.client.send('auth.register.user', registerUserDto),
      );

      return auth;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    try {
      const auth = await firstValueFrom(
        this.client.send('auth.login.user', loginUserDto),
      );

      return auth;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard)
  @Post('verify')
  async verifyToken(@User() user: CurrentUser, @Token() token: string) {
    try {
      // const auth = await firstValueFrom(
      //   this.client.send('auth.verify.token', { user, token }),
      // );

      // return auth;
      return { user, token };
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
