import { Controller, Post, Res, HttpStatus, Body, Patch } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../services/user.service';
import { CreateUserDto, PatchUserDto } from '../models/user.models';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  async create(@Res() res: Response, @Body() user: CreateUserDto) {
    const { username, email } = user;
    if (await this.userService.getOne({ username }))
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'username already exist' });
    if (await this.userService.getOne({ email }))
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'email already exist' });
    const newUser = await this.userService.create(user);
    res.status(HttpStatus.CREATED).json(newUser).send();
  }
  @Patch()
  async update(@Res() res: Response, @Body() user: PatchUserDto) {
    const updatedUser = await this.userService.update(user);
    res.status(HttpStatus.CREATED).json(updatedUser).send();
  }
}
