import Lenis from "@studio-freight/lenis";

import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default (element): Function => {
    const lenis = new Lenis();

    const scrollUpdate = () => {
        ScrollTrigger.update();
    }

    lenis.on('scroll', scrollUpdate);

    const scrollFn = (time) => {
        lenis.raf(time);
    };

    gsap.ticker.add(scrollFn);

    return () => {
        lenis.off('scroll', scrollUpdate);
        gsap.ticker.remove(scrollFn);
    }
}
