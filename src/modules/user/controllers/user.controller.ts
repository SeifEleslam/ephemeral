import { Controller, Post, Res, HttpStatus, Body } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../services/user.service';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  createUser(@Res() res: Response, @Body() user: User) {
    this.userService.create(user);
    res.status(HttpStatus.CREATED).json().send();
  }
}
