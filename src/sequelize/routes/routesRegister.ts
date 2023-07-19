import { Express } from 'express';
import userRouter from './userRouter';

function routesRegister(app: Express) {
  app.use('/user', userRouter);
}

export default routesRegister;
