import BonusLancer from "./BonusLancer.model.ts";
import Frame from "./Frame.model.ts";
import Lancer from "./Lancer.model.ts";

export default class Game {
    indiceActualFrame:number;
    indiceActualLancer:number;
    frames:Frame[] = [];
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

    toString():string {
        let res:string = "";
        
        this.frames.forEach((frame, index) => {
            res += ( index < 5 ? frame.toString() : frame.toString(true))+": "+frame.totalActuel+"  ";
        }); 

        return res;
    }  

    addFrame (frame: Frame) {
        if (this.frames.length < 6) {
            this.frames.push(frame);
        } else {
            throw new Error("Impossible d'ajouter plus de frame dans le jeu");
        }
    }

    addBonusLancer (bonusLancer: BonusLancer) {
        this.bonusLancers.push(bonusLancer);
    }

    removeAllBonusLancerWithNbrLancerZero () {
        this.bonusLancers = this.bonusLancers.filter(bonusLancer => bonusLancer.nbrLancer !== 0);          
    }

    addPointToFrameInBonusLancer(point: number) {
        this.bonusLancers.forEach((bonusLancer, index) => {
            this.frames[bonusLancer.indiceFrame]!.totalActuel += point;
            bonusLancer.decrementerNbrLancer();
        });
    }

    setFinalScoreFromThrowPoints() {
        this.scoreFinal = this.frames.reduce((acc, frame) => acc + frame.totalActuel, 0);
    }

    addNewPoint (point: number) {
        if (!this.isFinished) {

            let actualFrame: Frame = this.frames[this.indiceActualFrame]!;
            let actualLancer: Lancer = actualFrame.lancers[this.indiceActualLancer]!;

            const sommeLancersAvant = actualFrame.lancers.slice(0, this.indiceActualLancer).reduce((acc: number, lancer: Lancer) => acc + lancer.point, 0);

            const pointToAdd = (point === 15 && this.indiceActualLancer > 0) ? 15 - sommeLancersAvant : point;
    
            actualLancer.point = point;
            actualFrame.totalActuel += (this.indiceActualFrame < 5) ? pointToAdd : 0; 
    
            this.addPointToFrameInBonusLancer(point);
    
            if (point == 15) {
    
                if (this.indiceActualLancer == 0) {
                    actualLancer.isStrike = true;
                    if (this.indiceActualFrame < 5 ) {
                        this.addBonusLancer(new BonusLancer(this.indiceActualFrame, 3));
                    }
                } else {
                    actualLancer.isSpare = true;
                    if (this.indiceActualFrame < 5 ) {
                        this.addBonusLancer(new BonusLancer(this.indiceActualFrame, 2));
                    }
                }
    
                this.indiceActualLancer = (this.indiceActualFrame >= 5) ? (this.indiceActualLancer + 1) % 3 : 0;
                this.indiceActualFrame = (this.indiceActualFrame >= 5) ? this.indiceActualFrame : this.indiceActualFrame + 1;
    
            } else {
                this.indiceActualLancer = ( this.indiceActualLancer + 1 ) % 3;
                this.indiceActualFrame = (this.indiceActualLancer == 0) ? this.indiceActualFrame + 1  : this.indiceActualFrame;
            }
    
            this.removeAllBonusLancerWithNbrLancerZero();
            this.setFinalScoreFromThrowPoints();

            console.log(this.toString());
            console.log("totalScore :", this.scoreFinal);
            console.log("-------------------------");
            
            
    
            if (this.indiceActualFrame >= 5 && this.bonusLancers.length == 0) {
                this.isFinished = true;
            }

        } else {
            throw new Error("Le jeu est dejà terminé !");
        }
    }


}