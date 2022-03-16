import { UserDocument } from './../../modules/user/schemas/user.schema';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((_: unknown, ctx: ExecutionContext): UserDocument => {
  const request = ctx.switchToHttp().getRequest();
  return request.user._id;
});
