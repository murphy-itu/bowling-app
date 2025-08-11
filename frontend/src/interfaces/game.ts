    interface Lancer {
        point: number;
        isStrike: boolean;
        isSpare: boolean;
    }

    interface Frame {
        lancers: Lancer[];
        totalActuel: number;
        totalAAfficher: number;
    }

    interface BonusLancer {
        indiceFrame: number;
        nbrLancer: number;
    }

    interface Game {
        indiceActualFrame: number;
        indiceActualLancer: number;
        frames: Frame[];
        bonusLancers: BonusLancer[];
        scoreFinal: number;
        isFinished: boolean;
    }

    export type {Game, Frame, BonusLancer, Lancer};
