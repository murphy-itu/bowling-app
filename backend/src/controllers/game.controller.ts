import type { Request, Response } from 'express';
import Game from '../models/Game.model.ts';

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

        return res.json({
            message: 'Point ajouté avec succès',
            totalActuel: game.scoreFinal
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: (error as Error).message });
    }
};

export const restartGame = (req: Request, res: Response) => {
    game = new Game();

    return res.json({
        message: "Nouvelle partie lancée"
    });
}