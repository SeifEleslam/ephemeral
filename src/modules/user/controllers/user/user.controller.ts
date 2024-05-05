import { Controller, Post, Res, HttpStatus, Body, Patch } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../../services/user.service';
import { CreateUserDto, PatchUserDto } from '../../models/user.models';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Patch()
  async update(@Res() res: Response, @Body() user: PatchUserDto) {
    const updatedUser = await this.userService.update(user);
    res.status(HttpStatus.CREATED).json(updatedUser).send();
  }
}
