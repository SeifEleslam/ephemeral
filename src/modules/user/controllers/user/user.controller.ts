import { Controller, Res, HttpStatus, Body, Patch } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../../services/user.service';
import { PatchUserDto } from '../../models/user.models';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  /**
   * Handles PATCH requests to update a user's information.
   * - Expects the updated user data in the request body as a PatchUserDto object.
   * - Calls the UserService to update the user in the database.
   * - Returns the updated user information on success (status code 201 Created).
   * @param res Express response object for sending HTTP responses.
   * @param user The updated user data (PatchUserDto) to be saved.
   * @returns A JSON object containing the updated user information or an error message.
   */
  @Patch()
  async update(@Res() res: Response, @Body() user: PatchUserDto) {
    const updatedUser = await this.userService.update(user);
    // Removed unnecessary send() as NestJS handles sending the response after json()
    return res.status(HttpStatus.CREATED).json(updatedUser);
  }
}
