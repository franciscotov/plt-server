import { Router } from "express";
import { createGame } from "../../services/gameService";

const gameRouter = Router();
gameRouter.post("/create", createGame);

export default gameRouter;