import { Router } from "express";
import userRouter from "./userRouter";
import gameRouter from "./gameRouter";
import campusRouter from "./campusRouter";
import daysRouter from "./daysRouter";
import gameTypeRouter from "./gameTypeRouter";
import listRouter from "./listRouter";

function routesRegister(router: Router) {
  router.use("/user", userRouter);
  router.use("/game", gameRouter);
  router.use("/campus", campusRouter);
  router.use("/days", daysRouter);
  router.use("/list", listRouter);
  router.use("/game-type", gameTypeRouter);
}

export default routesRegister;
