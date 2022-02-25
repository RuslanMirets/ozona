import { SetMetadata } from '@nestjs/common';

export const Role = (...role: string[]) => SetMetadata(process.env.ROLE_KEY, role);
