import { Sequelize } from 'sequelize-typescript';
import path from 'path';
import { DB_NAME, DB_HOST, DB_PASSWORD, DB_USERNAME } from './constants';

const modelsPath = path.join(__dirname, '../database/models/');

export const sequelize = new Sequelize({
  host: DB_HOST,
  database: DB_NAME,
  dialect: 'mysql',
  username: DB_USERNAME,
  password: DB_PASSWORD,
  models: [modelsPath],
  logging: true,
});
