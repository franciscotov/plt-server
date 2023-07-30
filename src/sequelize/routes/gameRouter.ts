import { Router } from "express";
import { createGame, getGames } from "../../services/gameService";

const gameRouter = Router();
gameRouter.post("/create", createGame);
gameRouter.post("/list", getGames);

export default gameRouter;