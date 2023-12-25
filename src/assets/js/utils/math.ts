export function interpolate (start, end, value) {
    return (start * (1.0 - value)) + (end * value)
}

export function mix (start, end, amt) {
    return start + (end - start) * amt;
}

export function clamp (min, max, number) {
    return Math.max(min, Math.min(number, max))
}

export function random (min, max) {
    return Math.random() * (max - min) + min
}