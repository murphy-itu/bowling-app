export default class Lancer {
    point: number | null;
    isStrike: boolean;
    isSpare: boolean;

    constructor(point?: number, isStrike?: boolean, isSpare?: boolean) {
        this.point = point ?? null;
        this.isStrike = isStrike ?? false;
        this.isSpare = isSpare ?? false;
    }

}