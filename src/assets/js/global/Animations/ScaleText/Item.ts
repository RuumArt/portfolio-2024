import gsap from "gsap";

// interface DOMInterface {
//     el: HTMLElement,
//     inner: HTMLElement[],
//     innerWrap: HTMLElement[],
// }

export default class Item {
    DOM = {
        el: null,
        inner: null,
        innerWrap: null,
    };

    totalCells = 1;

    constructor(DOM_el, totalCells = 1) {
        this.DOM.el = DOM_el;

        this.totalCells = totalCells;

        this.layout();

        this.setCSSValues();
        this.addListeners();
    }

    addListeners = () => {
        window.addEventListener('resize', this.setCSSValues);
    }

    removeListeners = () => {
        window.removeEventListener('resize', this.setCSSValues);
    }

    destroy = () => {
        this.removeListeners();
    }

    layout = () => {
        let newHTML = '';

        for (let i = 0; i < this.totalCells; ++i) {
            newHTML += `<span class="gtext__box"><span class="gtext__box-inner">${this.DOM.el.dataset.text}</span></span>`;
        }

        this.DOM.el.classList.add('gtext');
        this.DOM.el.innerHTML = newHTML;
        this.DOM.innerWrap = this.DOM.el.querySelectorAll('.gtext__box');
        this.DOM.inner = this.DOM.el.querySelectorAll('.gtext__box-inner');
    }

    setCSSValues = () => {
        const computedWidth = window.getComputedStyle(this.DOM.inner[0]).width;

        this.DOM.el.style.setProperty('--text-width', computedWidth);
        this.DOM.el.style.setProperty('--gsplits', `${this.totalCells}`);

        const offset = parseFloat(computedWidth) / this.totalCells;

        this.DOM.inner.forEach((inner, pos) => {
            gsap.set(inner, { left: offset * -pos });
        });
    }
}