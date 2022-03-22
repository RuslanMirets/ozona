import { Role } from './models/role.model';
import { ROLE_REPOSITORY } from './../../core/constants/index';

export const roleProvider = [{ provide: ROLE_REPOSITORY, useValue: Role }];
