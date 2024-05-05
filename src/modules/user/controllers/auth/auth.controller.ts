import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { SignInDto } from '../../models/auth.models';
import { AuthService } from '../../services/auth.service';
import { CreateUserDto } from '../../models/user.models';
import { UserService } from '../../services/user.service';
import { Public } from '../../../global/decorators/public';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private auth: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @Post('signup')
  async create(@Res() res: Response, @Body() user: CreateUserDto) {
    const { username, email, password } = user;
    if (await this.userService.getOne({ username }))
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'username already exist' });
    if (await this.userService.getOne({ email }))
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'email already exist' });
    const saltOrRounds = await bcrypt.genSalt();
    const hashedPwd = await bcrypt.hash(password, saltOrRounds);
    const newUser = await this.userService.create({
      ...user,
      password: hashedPwd,
    });
    res.status(HttpStatus.CREATED).json(newUser).send();
  }

  @Public()
  @Post('signin')
  async signin(@Res() res: Response, @Body() user: SignInDto) {
    const { email, password } = user;
    res
      .status(HttpStatus.OK)
      .json(await this.auth.signIn(email, password))
      .send();
  }
}
