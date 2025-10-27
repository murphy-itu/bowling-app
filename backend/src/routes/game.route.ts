import { Router } from "express";
import { restartGame, addNewPoint, getGame  } from "../controllers/game.controller.js";

const gameRouter = Router();

gameRouter.post('/addPoint', addNewPoint);
gameRouter.post('/restart', restartGame);
gameRouter.get('/getGame', getGame);

export default gameRouter;