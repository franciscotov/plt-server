import { Router } from "express";
import { getGameTypes } from "../../services/gameTypeService.ts";

const gameTypeRouter = Router();
gameTypeRouter.get("/list", getGameTypes);

export default gameTypeRouter;
