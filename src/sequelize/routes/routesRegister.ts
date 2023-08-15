import { Express } from 'express';
import userRouter from './userRouter';
import gameRouter from './gameRouter';
import campusRouter from './campusRouter';
import daysRouter from './daysRouter';
import gameTypeRouter from './gameTypeRouter';

function routesRegister(app: Express) {
  app.use('/user', userRouter);
  app.use('/game', gameRouter);
  app.use('/campus', campusRouter);
  app.use('/days', daysRouter);
  app.use('/game-type', gameTypeRouter);
}

export default routesRegister;
