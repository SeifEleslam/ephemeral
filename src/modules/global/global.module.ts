// This is a sample TypeScript module

// Import necessary modules
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './services/prisma/prisma.service';

// Define a global module with a Prisma service
@Global()
@Module({
  // No imports needed for this module
  imports: [],

  // No controllers needed for this module
  controllers: [],

  // Define a provider for the Prisma service
  providers: [PrismaService],

  // Export the Prisma service so it can be used by other modules
  exports: [PrismaService],
})
export class GlobalModule { }
