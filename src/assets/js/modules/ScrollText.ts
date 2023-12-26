import ScaleTextAnimation from "../global/Animations/ScaleText";

const TOTAL_CELLS = 4;

export default (element: HTMLElement): Function => {
    ScaleTextAnimation(element, TOTAL_CELLS);
}
