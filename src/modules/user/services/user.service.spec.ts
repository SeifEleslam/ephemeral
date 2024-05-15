import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

/**
 * Unit test suite for the UserService.
 * This suite defines a set of tests to verify the functionality of the UserService.
 */
describe('UserService', () => {
  let service: UserService;

  /**
   * This function sets up the testing environment before each test execution.
   * - Creates a NestJS testing module using `Test.createTestingModule`.
   * - Provides the `UserService` as a provider to the module.
   * - Compiles the module using `compile()`.
   * - Retrieves an instance of the `UserService` from the module using `module.get<UserService>(UserService)`.
   * - Assigns the retrieved instance to the `service` variable for use in the tests.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  /**
   * This test verifies that the `UserService` instance is properly defined.
   * - Uses the Jest testing framework's `expect` assertion to check if `service` is defined (not null or undefined).
   */
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
