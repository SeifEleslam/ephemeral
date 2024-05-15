// Import the SetMetadata decorator from @nestjs/common
import { SetMetadata } from '@nestjs/common';

// Define a constant string key for the 'isPublic' metadata
export const IS_PUBLIC_KEY = 'isPublic';

// Define a decorator called Public that sets the 'isPublic' metadata to true
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
