import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user/user.controller';
import { AuthService } from './services/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './controllers/auth/auth.controller';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_JWT,
    }),
  ],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService],
})
export class UserModule {}
