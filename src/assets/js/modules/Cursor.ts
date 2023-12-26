import Cursor from "../global/Cursor";

export default (element: HTMLElement): Function => {
    const cursor = new Cursor(element);
    cursor.init();

    return () => {
        cursor.destroy();
    }
}
