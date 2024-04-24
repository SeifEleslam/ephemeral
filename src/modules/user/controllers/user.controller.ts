import { Controller, Post, Res, HttpStatus, Body } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../models/user.models';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  create(@Res() res: Response, @Body() user: CreateUserDto) {
    this.userService.create(user);
    res.status(HttpStatus.CREATED).json().send();
  }
}
