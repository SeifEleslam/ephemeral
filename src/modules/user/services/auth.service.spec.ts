import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

/**
 * Unit test suite for the AuthService.
 * This suite defines a set of tests to verify the functionality of the AuthService.
 */
describe('AuthService', () => {
  let service: AuthService;

  /**
   * This function sets up the testing environment before each test execution.
   * - Creates a NestJS testing module using `Test.createTestingModule`.
   * - Provides the `AuthService` as a provider to the module.
   * - Compiles the module using `compile()`.
   * - Retrieves an instance of the `AuthService` from the module using `module.get<AuthService>(AuthService)`.
   * - Assigns the retrieved instance to the `service` variable for use in the tests.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  /**
   * This test verifies that the `AuthService` instance is properly defined.
   * - Uses the Jest testing framework's `expect` assertion to check if `service` is defined (not null or undefined).
   */
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
