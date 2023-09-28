import { Router } from "express";
import { signUpPlayerToList } from "../services/playerList/playerListService.ts";

const playerListRouter = Router();
playerListRouter.post("/signUpForAList", signUpPlayerToList);

export default playerListRouter;