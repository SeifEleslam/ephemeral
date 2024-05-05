import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/modules/user/services/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ user: Partial<User>; access_token: string }> {
    const user = await this.usersService.getOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException();
    const payload = { sub: user.id, email: user.email };
    return {
      user: { username: user.username, email: user.email },
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
