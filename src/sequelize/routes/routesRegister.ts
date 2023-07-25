import { Express } from 'express';
import userRouter from './userRouter';
import gameRouter from './gameRouter';
import campusRouter from './campusRouter';

function routesRegister(app: Express) {
  app.use('/user', userRouter);
  app.use('/game', gameRouter);
  app.use('/campus', campusRouter);
}

export default routesRegister;
