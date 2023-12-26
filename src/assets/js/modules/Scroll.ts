import Scroll from "../global/Scroll";

export default (element: HTMLElement): Function => {
    const scroll = new Scroll();

    return () => {
        scroll.destroy();
    }
}
