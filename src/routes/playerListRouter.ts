import { Router } from "express";
import { signUpPlayerToList } from "../services/playerListService.ts";

const playerListRouter = Router();
playerListRouter.post("/signUpForAList", signUpPlayerToList);

export default playerListRouter;