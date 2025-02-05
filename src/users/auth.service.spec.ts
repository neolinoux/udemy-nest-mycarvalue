import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";

it('can create an instance of auth service', async () => {
  const fakeUserService = {
    find: () => Promise.resolve([]),
    create: (email, password) => Promise.resolve({id:1, email, password})
  }

  const module = await Test.createTestingModule({
    providers: [
      AuthService,
      {
        provide: UsersService,
        useValue: fakeUserService
      }
    ]
  }).compile();

  const service = module.get(AuthService);

  expect(service).toBeDefined();
})