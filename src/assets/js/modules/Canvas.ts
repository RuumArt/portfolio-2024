import Canvas  from "../webgl";

export default (element: HTMLCanvasElement): Function => {
    const canvas = new Canvas(element);

    return () => {
        canvas.dispose();
    }
}
