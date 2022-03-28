import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as UserModel } from 'src/modules/user/models/user.model';

export const User = createParamDecorator((_: unknown, ctx: ExecutionContext): UserModel => {
  const request = ctx.switchToHttp().getRequest();
  return request.user.id;
});
