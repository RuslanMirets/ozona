import { Upload } from './../../modules/upload/models/upload.model';
import { Product } from './../../modules/product/models/product.model';
import { UserRole } from './../../modules/role/models/user-role.model';
import { Role } from './../../modules/role/models/role.model';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/modules/user/models/user.model';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, Role, UserRole, Product, Upload]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
