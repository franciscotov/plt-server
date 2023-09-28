import { Router } from "express";
import userRouter from "./userRouter.ts";
import gameRouter from "./gameRouter.ts";
import campusRouter from "./campusRouter.ts";
import daysRouter from "./daysRouter.ts";
import gameTypeRouter from "./gameTypeRouter.ts";
import listRouter from "./listRouter.ts";
import playerListRouter from "./playerListRouter.ts";

function routesRegister(router: Router) {
  router.use("/user", userRouter);
  router.use("/game", gameRouter);
  router.use("/campus", campusRouter);
  router.use("/days", daysRouter);
  router.use("/list", listRouter);
  router.use("/player-list", playerListRouter);
  router.use("/game-type", gameTypeRouter);
}

export default routesRegister;
