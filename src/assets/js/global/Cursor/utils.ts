import { clamp, getDistance, roundFloor } from "../../utils/math";

export const getMousePosition = (e) => {
    const { clientX, clientY } = e;

    return { x: clientX, y: clientY };
}

export const inScreen = (e) => {
    const event = e ? e : window.event;
    const from = event.relatedTarget || event.toElement;

    return !(!from || from.nodeName === 'HTML');
}

export const getDir = (current, final) => {
    const distX = current.x > final.x ? 1 : -1;
    const distY = current.y > final.y ? 1 : -1;
    return { x: distX, y: distY };
};

export const getSpeed = (current, final, maxDist = 100) => {
    const dist = getDistance(current.x, final.x, current.y, final.y) / maxDist;
    return clamp(roundFloor(dist, 4), 0, 1);
};

