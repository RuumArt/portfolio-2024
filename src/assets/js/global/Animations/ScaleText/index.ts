import Item from "./Item";
import gsap from "gsap";

export default (element, cells) => {
    const item = new Item(element, cells);

    const itemInner = item.DOM.inner;

    const initialValues = {
        x: 13,
        rotate: 34,
    };

    const tween = gsap.fromTo(itemInner, {
        xPercent: (pos, _, arr) => pos < arr.length/2 ? -initialValues.x*pos-initialValues.x : initialValues.x*(pos-arr.length/2)+initialValues.x,
        rotate: (pos, _, arr) => pos < arr.length/2 ? -initialValues.x*pos-initialValues.rotate : initialValues.rotate*(pos-arr.length/2)+initialValues.rotate,
    }, {
        ease: 'power1',
        xPercent: 0,
        rotate: 0,
        scrollTrigger: {
            trigger: item.DOM.el,
            start: 'top bottom',
            end: 'center center',
            scrub: true
        }
    });

    return () => {
        item.destroy();
        tween.kill();
    }
}