import { CurrentUserInterceptor } from './current-user.interceptor';
import { UsersService } from '../users.service';

describe('InterceptorInterceptor', () => {
  it('should be defined', () => {
    expect(new CurrentUserInterceptor(usersService : UsersService)).toBeDefined();
  });
});
