// Import necessary modules from NestJS and Express
import {
  CanActivate, // Interface for guarding routes
  ExecutionContext, // Interface for accessing the current request and response
  Injectable, // Decorator for injecting dependencies
  UnauthorizedException, // Exception for unauthorized access
} from '@nestjs/common';
import { Reflector } from '@nestjs/core'; // Reflect metadata
import { JwtService } from '@nestjs/jwt'; // Service for working with JSON Web Tokens (JWT)
import { Request } from 'express'; // Request object from Express.js
import { IS_PUBLIC_KEY } from '../decorators/public';

// Define a decorator for the AuthGuard
@Injectable()
export class AuthGuard implements CanActivate {
  // Initialize the guard with a JwtService and Reflector
  constructor(
    private jwtService: JwtService, // Service for verifying and generating JWTs
    private reflector: Reflector, // Reflect metadata for route handlers
  ) { }

  // Method to determine if the route can be activated
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get the handler and class from the execution context
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If the route is public, allow access
    if (isPublic) return true;

    // Get the request from the execution context
    const request = context.switchToHttp().getRequest();

    // Extract the token from the Authorization header
    const token = this.extractTokenFromHeader(request);

    // If no token is provided, throw an UnauthorizedException
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      // Verify the token using the JwtService
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_JWT, // Secret key for verifying JWTs
      });

      // Set the user on the request object
      request['user'] = payload;
    } catch {
      // If the token is invalid, throw an UnauthorizedException
      throw new UnauthorizedException();
    }

    // If the token is valid, allow access
    return true;
  }

  // Private method to extract the token from the Authorization header
  private extractTokenFromHeader(request: Request): string | undefined {
    // Split the Authorization header into type and token
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    // If the type is 'Bearer', return the token
    return type === 'Bearer' ? token : undefined;
  }
}