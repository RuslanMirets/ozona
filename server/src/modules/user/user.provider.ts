import { USER_REPOSITORY } from './../../core/constants/index';
import { User } from './models/user.model';

export const userProvider = [{ provide: USER_REPOSITORY, useValue: User }];
