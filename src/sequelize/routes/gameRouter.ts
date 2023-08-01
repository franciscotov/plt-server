import { Router } from "express";
import { createGame, getGames, updateGame } from "../../services/gameService";

const gameRouter = Router();
gameRouter.post("/create", createGame);
gameRouter.post("/list", getGames);
gameRouter.put("/update", updateGame);

export default gameRouter;