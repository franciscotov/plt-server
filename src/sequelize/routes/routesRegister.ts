import { Express } from 'express';
import userRouter from './userRouter';
import gameRouter from './gameRouter';

function routesRegister(app: Express) {
  app.use('/user', userRouter);
  app.use('/game', gameRouter);
}

export default routesRegister;
