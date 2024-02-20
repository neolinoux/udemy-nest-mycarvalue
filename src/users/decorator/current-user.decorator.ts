import {
  SetMetadata,
  createParamDecorator,
  ExecutionContext
} from '@nestjs/common';


export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const requset = context.switchToHttp().getRequest();
    return requset.currentUser;
  }
)
