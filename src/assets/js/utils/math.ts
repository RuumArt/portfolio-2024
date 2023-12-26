export function interpolate (start, end, value) {
    return (start * (1.0 - value)) + (end * value)
}

export function mix (start, end, amt) {
    return start + (end - start) * amt;
}

export function clamp (min, max, number) {
    return Math.max(min, Math.min(number, max))
}

export const round = (t, i) => {
    i = 0 !== i ? Math.pow(10, i) : 1e3; // eslint-disable-line
    return Math.round(t * i) / i;
};

export const roundFloor = (t, i) => {
    i = 0 !== i ? Math.pow(10, i) : 1e3; // eslint-disable-line
    return Math.floor(t * i) / i;
};

export const randomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
};

export const getDistance = (x1, x2, y1, y2) => {
    return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5;
};

export const step = (edge, x) => (x < edge ? 0 : 1);

export const tri = p => {
    return mix(p, 1 - p, step(0.5, p)) * 2;
};

