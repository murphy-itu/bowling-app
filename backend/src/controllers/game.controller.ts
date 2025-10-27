import type { Request, Response } from 'express';
import Game from '../models/Game.model';

let game = new Game();

export const addNewPoint = (req: Request, res: Response) => {
    try {
        const { point } = req.body;

        if (typeof point !== 'number') {
            return res.status(400).json({ error: 'Le point doit être un nombre' });
        }

        if (point > 15) {
            return res.status(400).json({ error: 'le quille max est de 15'});
        }

        game.addNewPoint(point);

        return res.json(game);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: (error as Error).message });
    }
};

export const restartGame = (req: Request, res: Response) => {
    game = new Game();

    return res.json(game);
}

export const getGame = (req: Request, res: Response) => {
    return res.json(game);
}