import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

export default class Scroll {
    options: object;
    scroll: any;

    constructor() {
        this.options = {};
        this.scroll = null;

        this.init();
    }

    scrollFn = (time) => {
        this.scroll.raf(time * 1000);
    };

    onScrollUpdate = () => {
        ScrollTrigger.update();
    }

    init() {
        this.scroll = new Lenis();

        this.scroll.on('scroll', this.onScrollUpdate);
        gsap.ticker.add(this.scrollFn);
    }

    destroy() {
        this.scroll.off('scroll', this.onScrollUpdate);
        gsap.ticker.remove(this.scrollFn);
    }
}