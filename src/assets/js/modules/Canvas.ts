import Canvas  from "../global/Webgl";

export default (element: HTMLCanvasElement): Function => {
    const canvas = new Canvas(element);

    return () => {
        canvas.dispose();
    }
}
