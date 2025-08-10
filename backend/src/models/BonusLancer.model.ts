export default class BonusLancer {
    indiceFrame: number;
    nbrLancer: number;

    constructor(indiceFrame: number, nbrLancer: number) {
        this.indiceFrame = indiceFrame;
        this.nbrLancer = nbrLancer;
    }

    decrementerNbrLancer() {
        if (this.nbrLancer == 0) {
            throw new Error("Le nombre de lancer est dejà 0 !!");
        } else {
            this.nbrLancer -= 1;
        }
    }

}