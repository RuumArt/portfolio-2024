import GlobalCursor from "./GlobalCursor";
import { Position } from "../../types/cursor";
import {getDir, getMousePosition, getSpeed, inScreen} from "./utils";
import gsap from 'gsap';
import {mix, round} from "../../utils/math";

export default class Cursor extends GlobalCursor {
    wrap: HTMLElement;
    el: HTMLElement;
    currentPosition: Position;
    finalPosition: Position;
    mouseDownFactor: number;
    amt: number;

    constructor(element, startPosition = { x: 0, y: 0 }, amt = 0.2) {
        super();

        this.wrap = element;
        this.el = element.querySelector('.js-cursor');

        this.currentPosition = startPosition;
        this.finalPosition = startPosition;

        this.mouseDownFactor = 0;
        this.amt = amt;
    }

    changeVisibleCursor = (isVisible) => {
        gsap.to(this.el, {
            duration: 0.3,
            opacity: isVisible ? 1 : 0,
            ease: 'power2.out',
        });

        this.setVisible(isVisible);
    }

    toggleCursorDown = (isDown) => {
        this.mouseDownFactor = isDown ? 0.2 : 0;

        gsap.to(this.el, {
            duration: 0.4,
            '--scale-down': this.mouseDownFactor,
            overwrite: 'auto',
        });
    }

    onWindowLeave = (e) => {
        if (this.isVisible && !inScreen(e)) {
            this.changeVisibleCursor(false);
        }
    }

    onMouseMove = (e) => {
        this.finalPosition = getMousePosition(e);

        if (!this.isVisible) {
            this.changeVisibleCursor(true);
        }
    }

    onMouseUp = () => {
        this.toggleCursorDown(false);
    }

    onMouseDown = () => {
        this.toggleCursorDown(true);
    }

    onMouseOut = (e) => {
        this.onWindowLeave(e);
    }

    addEvents() {
        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('mousedown', this.onMouseDown);
        window.addEventListener('mouseup', this.onMouseUp);
        window.document.addEventListener('mouseout', this.onMouseOut);
    }

    removeEvents() {
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('mousedown', this.onMouseDown);
        window.removeEventListener('mouseup', this.onMouseUp);
        window.document.removeEventListener('mouseout', this.onMouseOut);
    }

    render = () => {
        const [distX, distY] = [
            this.finalPosition.x - this.currentPosition.x,
            this.finalPosition.y - this.currentPosition.y
        ];

        const dist = Math.sqrt(distX ** 2 + distY ** 2);
        if (dist < 0.01) return;

        this.currentPosition = {
            x: mix(this.currentPosition.x, this.finalPosition.x, this.amt),
            y: mix(this.currentPosition.y, this.finalPosition.y, this.amt),
        }

        this.setPosition(this.currentPosition);

        this.dist = {
            x: distX,
            y: distY,
        };

        this.speed = getSpeed(this.currentPosition, this.finalPosition, 150);
        this.dir = getDir(this.currentPosition, this.finalPosition);

        const [roundX, roundY] = [
            round(this.currentPosition.x, 3),
            round(this.currentPosition.y, 3)
        ];

        gsap.set(this.el, {
            x: roundX,
            y: roundY,
            scaleX: (1 + this.speed),
            rotate: 15 * (1 + this.speed) * this.dir.x,
        });
    }

    init() {
        this.setPosition(this.currentPosition);
        gsap.ticker.add(this.render);
        this.addEvents();
    }

    destroy() {
        this.removeEvents();
        gsap.ticker.remove(this.render);
    }
}