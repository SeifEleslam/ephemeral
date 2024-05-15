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
    private readonly auth: AuthService, // Use readonly for better immutability
    private readonly userService: UserService, // Use readonly for better immutability
  ) { }

  /**
   * Handles user signup requests.
   * - Checks for existing username and email conflicts.
   * - Hashes the password before creating a new user.
   * - Returns the newly created user on success.
   * @param res Express response object for sending HTTP responses.
   * @param user The user data (CreateUserDto) to be created.
   * @returns A JSON object containing the newly created user or an error message.
   */
  @Public()
  @Post('signup')
  async create(@Res() res: Response, @Body() user: CreateUserDto) {
    const { username, email, password } = user;

    // Check for existing username
    if (await this.userService.getOne({ username })) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'username already exists' });
    }

    // Check for existing email
    if (await this.userService.getOne({ email })) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'email already exists' });
    }

    // Hash password securely
    const saltOrRounds = await bcrypt.genSalt();
    const hashedPwd = await bcrypt.hash(password, saltOrRounds);

    // Create new user with hashed password
    const newUser = await this.userService.create({
      ...user,
      password: hashedPwd,
    });

    return res.status(HttpStatus.CREATED).json(newUser);
  }

  /**
   * Handles user signin requests.
   * - Delegates signin logic to the AuthService.
   * - Returns the user object (if successful) or an error message.
   * @param res Express response object for sending HTTP responses.
   * @param user The user data (SignInDto) for signin.
   * @returns A JSON object containing the user or an error message.
   */
  @Public()
  @Post('signin')
  async signin(@Res() res: Response, @Body() user: SignInDto) {
    const { email, password } = user;

    return res
      .status(HttpStatus.OK)
      .json(await this.auth.signIn(email, password));
  }
}
