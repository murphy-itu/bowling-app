import Lancer from "./Lancer.model.ts";

export default class Frame {
    lancers: Lancer[] = [];
    totalActuel: number;

    constructor() {
        this.totalActuel = 0;

        for (let i = 0; i < 3; i++) {
            this.addLancer(new Lancer());
        }
    }

    addLancer(lancer: Lancer) {
        if (this.lancers.length < 3) {
            this.lancers.push(lancer);
        } else {
            throw new Error("Impossible d'ajouter plus de lancer dans cette frame");
        }
    }

    getLancer(index: number): Lancer | null {
        return this.lancers[index] ?? null;
    }

    addPointToTotal(point: number) {
        this.totalActuel += point;
    }

    toString(isSupp?: boolean): string {
        let res: string = "[";

        this.lancers.forEach((lancer, index) => {
            if (isSupp) {
                res += lancer.point.toString();
            } else {
                if (lancer.point == 15) {
                    res += (index === 0) ? "X" : "/";
                } else {
                    res += lancer.point.toString();
                }
            }

            if (index <= 1) res += ",";
        });

        res += "]";

        return res;
    }


}