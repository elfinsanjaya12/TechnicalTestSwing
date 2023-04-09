import { Sequelize } from 'sequelize-typescript';

import {
  DB_HOST,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
} from '../../config/constants';

import { Store } from './store';
import { Product } from './product';
import { Upload } from './upload';

export const sequelize = new Sequelize({
  host: DB_HOST,
  database: DB_NAME,
  dialect: 'mysql',
  username: DB_USERNAME,
  password: DB_PASSWORD,
  logging: false,
});

sequelize.addModels([Product, Store, Upload]);

export const initDB = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ force: false });
};

export { Product, Store, Upload };
