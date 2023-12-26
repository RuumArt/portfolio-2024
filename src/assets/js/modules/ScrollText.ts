import Item from "../global/Animations/ScaleText/Item";

const TOTAL_CELLS = 4;

import gsap from 'gsap';

export default (element: HTMLElement): Function => {
    const item = new Item(element, TOTAL_CELLS);

    /* Animate elements */

    const itemInner = item.DOM.inner;

    const initialValues = {
        x: 13
    };

    const tween = gsap.fromTo(itemInner, {
        xPercent: (pos, _, arr) => pos < arr.length/2 ? -initialValues.x*pos-initialValues.x : initialValues.x*(pos-arr.length/2)+initialValues.x,
    }, {
        ease: 'power1',
        xPercent: 0,
        scrollTrigger: {
            trigger: item.DOM.el,
            start: 'top bottom',
            end: 'top top+=10%',
            scrub: true
        }
    });

    return () => {
        item.destroy();
        tween.kill();
    }
}
