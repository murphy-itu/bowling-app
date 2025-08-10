import { Router } from "express";
import { restartGame } from "../controllers/game.controller.ts";
import { addNewPoint } from "../controllers/game.controller.ts";

const gameRouter = Router();

gameRouter.post('/addPoint', addNewPoint);
gameRouter.post('/restart', restartGame);

export default gameRouter;