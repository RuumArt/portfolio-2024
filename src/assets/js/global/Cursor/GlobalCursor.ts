import { Position } from "../../types/cursor";

export default class GlobalCursor {
    position: Position;
    dist: Position;
    realPosition: Position;
    isVisible: Boolean;
    speed: number;
    dir: Position;
    functions: Array<(pos) => void>;
    intersectionWithElement: Boolean;

    constructor() {
        this.position = {
            x: 0,
            y: 0,
        }

        this.realPosition = {
            x: 0,
            y: 0,
        }

        this.dist = {
            x: 0,
            y: 0,
        }

        this.speed = 0;

        this.dir = {
            x: 0,
            y: 0,
        };

        this.isVisible = false;

        this.functions = [];
        this.intersectionWithElement = false;
    }

    setPosition = (data) => {
        this.position = {
            ...data,
        };
    }

    setVisible = (isVisible) => {
        this.isVisible = isVisible;
    }

    on = func => this.functions.push(func);

    off = func => {
        this.functions = this.functions.filter(el => el !== func);
    };

    update = () => {
        this.functions.forEach(el => el(this.position));
    };
}