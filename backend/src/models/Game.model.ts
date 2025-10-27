import BonusLancer from "./BonusLancer.model";
import Frame from "./Frame.model";
import Lancer from "./Lancer.model";

export default class Game {
    indiceActualFrame: number;
    indiceActualLancer: number;
    frames: Frame[] = [];
    bonusLancers: BonusLancer[] = [];
    scoreFinal: number;
    isFinished: boolean;

    constructor() {
        this.indiceActualFrame = 0;
        this.indiceActualLancer = 0;
        this.scoreFinal = 0;
        this.isFinished = false;

        for (let i = 0; i < 6; i++) {
            this.addFrame(new Frame());
        }
    }

    toString(): string {
        let res: string = "";

        this.frames.forEach((frame, index) => {
            const totalAAfficher = frame.totalAAfficher ?? frame.totalActuel;
            res += (index < 5 ? frame.toString() : frame.toString(true)) + ": " + totalAAfficher + "  ";
        });

        return res;
    }

    addFrame(frame: Frame) {
        if (this.frames.length < 6) {
            this.frames.push(frame);
        } else {
            throw new Error("Impossible d'ajouter plus de frame dans le jeu");
        }
    }

    addBonusLancer(bonusLancer: BonusLancer) {
        this.bonusLancers.push(bonusLancer);
    }

    removeAllBonusLancerWithNbrLancerZero() {
        const zeroLancer = this.bonusLancers.find(bonusLancer => bonusLancer.nbrLancer === 0);

        if (zeroLancer) {
            const frame = this.frames[zeroLancer.indiceFrame];
            if (frame) {
                frame.totalAAfficher = zeroLancer.indiceFrame === 0
                    ? frame.totalActuel
                    : (this.frames[zeroLancer.indiceFrame - 1]?.totalAAfficher ?? 0) + frame.totalActuel;
                this.scoreFinal = frame.totalAAfficher;
            }
        }

        this.bonusLancers = this.bonusLancers.filter(bonusLancer => bonusLancer.nbrLancer !== 0);
    }

    addPointToFrameInBonusLancer(point: number) {
        this.bonusLancers.forEach((bonusLancer) => {
            const frame = this.frames[bonusLancer.indiceFrame];
            if (!frame) return;
            frame.totalActuel += point;
            bonusLancer.decrementerNbrLancer();
        });
    }

    setFinalScoreFromThrowPoints() {
        this.scoreFinal = this.frames.reduce((acc, frame) => acc + (frame.totalActuel ?? 0), 0);
    }

    addNewPoint(point: number) {
        if (this.isFinished) {
            throw new Error("Le jeu est déjà terminé !");
        }

        const actualFrame = this.frames[this.indiceActualFrame];
        if (!actualFrame) return;

        const actualLancer = actualFrame.lancers[this.indiceActualLancer];
        if (!actualLancer) return;

        const copyIndiceActualFrame = this.indiceActualFrame;

        const sommeLancersAvant = actualFrame.lancers
            .slice(0, this.indiceActualLancer)
            .reduce((acc: number, lancer: Lancer) => acc + (lancer.point ?? 0), 0);

        const pointToAdd = (point === 15 && this.indiceActualLancer > 0 && this.indiceActualFrame < 5)
            ? 15 - sommeLancersAvant
            : point;

        actualLancer.point = point;
        actualFrame.totalActuel += (this.indiceActualFrame < 5 ? pointToAdd : 0);

        this.addPointToFrameInBonusLancer(pointToAdd);

        if (point === 15) {
            if (this.indiceActualLancer === 0) {
                actualLancer.isStrike = true;
                if (this.indiceActualFrame < 5) {
                    this.addBonusLancer(new BonusLancer(this.indiceActualFrame, 3));
                }
            } else {
                actualLancer.isSpare = true;
                if (this.indiceActualFrame < 5) {
                    this.addBonusLancer(new BonusLancer(this.indiceActualFrame, 2));
                }
            }

            this.indiceActualLancer = (this.indiceActualFrame >= 5) ? (this.indiceActualLancer + 1) % 3 : 0;
            this.indiceActualFrame = (this.indiceActualFrame >= 5) ? this.indiceActualFrame : this.indiceActualFrame + 1;

        } else {
            this.indiceActualLancer = (this.indiceActualLancer + 1) % 3;
            this.indiceActualFrame = (this.indiceActualLancer === 0) ? this.indiceActualFrame + 1 : this.indiceActualFrame;
        }

        this.removeAllBonusLancerWithNbrLancerZero();

        if (this.indiceActualFrame !== copyIndiceActualFrame) {
            if (!this.bonusLancers.some(bonusLancer => bonusLancer.indiceFrame === copyIndiceActualFrame)) {
                const frame = this.frames[copyIndiceActualFrame];
                if (frame) {
                    frame.totalAAfficher = copyIndiceActualFrame === 0
                        ? frame.totalActuel
                        : (this.frames[copyIndiceActualFrame - 1]?.totalAAfficher ?? 0) + frame.totalActuel;
                    this.scoreFinal = frame.totalAAfficher;
                }
            }
        }

        console.log(this.toString());
        console.log("totalScore :", this.scoreFinal);
        console.log("-------------------------");

        if (this.indiceActualFrame >= 5 && this.bonusLancers.length === 0) {
            this.isFinished = true;
            this.setFinalScoreFromThrowPoints();
        }
    }
}
