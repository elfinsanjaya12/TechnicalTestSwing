import express, { Express, Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import { initDB } from './database/models';

import { errorHandler } from './middlewares/error-handler';
import { appRouter } from './api/routes';

const app: Express = express();
dotenv.config();

const port: string | undefined = process.env.PORT;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// image server
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'api website test be swing v.01' });
});

app.use('/api', appRouter);

app.use((req, res) => {
  res.status(404).send({ msg: 'Route does not exist' });
});

app.use(errorHandler);

const server = async () => {
  await initDB();

  app.listen(port, () => console.log(`listening on port ${port}`));
};

server();
