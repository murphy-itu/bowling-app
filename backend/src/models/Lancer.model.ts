export default class Lancer {
    point: number;
    isStrike: boolean;
    isSpare: boolean;

    constructor(point?: number, isStrike?: boolean, isSpare?: boolean) {
        this.point = point ?? 0;
        this.isStrike = isStrike ?? false;
        this.isSpare = isSpare ?? false;
    }

}