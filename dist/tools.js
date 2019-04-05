export function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}
export function choose(...args) {
    if (args.length > 0) {
        return args[Math.round(Math.random() * (args.length - 1))];
    }
    else {
        return null;
    }
}
export function sum(list) {
    let sum = 0;
    for (let i = 0; i < list.length; i++) {
        sum += list[i];
    }
    return sum;
}
export function copyObject(object) {
    return JSON.parse(JSON.stringify(object));
}
export function clamp(x, min, max) {
    if (x < min) {
        return min;
    }
    else if (x > max) {
        return max;
    }
    else {
        return x;
    }
}
export function contains(arr, value) {
    // This functions returns true if value is in arr ...
    // -1 means there was no match, meaning if we get anything greater
    // thatn -1, we have a successful match ...
    return arr.indexOf(value) > -1;
}
export function hexToHash(hex) {
    // A randomised hex will likely return something like '5651037.562356'
    // which will not convert simply using this method, work out a way to
    // make it truncate the end part and parse it properly ...
    return "#" + hex.toString(16);
}
export function linearInterpolate(from, to, marker) {
    console.assert(from.x < to.x, "linearInterpolate(): to.x must be greater than from.x");
    console.assert(from.x <= marker, "linearInterpolate(): from.x must be less than or equal to p");
    console.assert(marker <= to.x, "linearInterpolate(): p must be less than or equal to to.x");
    return from.y + ((marker - from.x) * (to.y - from.y)) / (to.x - from.x);
}
export function linearInterpolatePoints(points, steps) {
    console.assert(points[0].x === 0, "Points must start from 0");
    console.assert(points[points.length - 1].x === 1, "Points must end with 1");
    console.assert(steps > 1);
    console.assert(points.length > 1);
    const s = steps - 1;
    const c = 1 / s;
    const positions = [];
    for (let i = 1; i < points.length; i++) {
        for (let j = Math.ceil(points[i - 1].x / c) * c; j <= points[i].x; j += c) {
            positions.push(linearInterpolate(points[i - 1], points[i], j));
        }
    }
    console.assert(positions.length === steps, "positions.length and steps aren't equal");
    return positions;
}
export function choices(map) {
    let cumSum = 0;
    let cumWeights = {};
    // Sum Category weights ...
    for (let name in map) {
        if (map.hasOwnProperty(name)) {
            cumSum += map[name];
            cumWeights[name] = cumSum;
        }
    }
    let roll = Math.random() * cumSum;
    // Get Category ...
    for (let name in cumWeights) {
        if (roll < cumWeights[name]) {
            return name;
        }
    }
    return null;
}
export default {
    randomRange,
    choose,
    sum,
    copyObject,
    clamp,
    contains,
    hexToHash,
    linearInterpolate,
    linearInterpolatePoints,
    choices
};
//# sourceMappingURL=tools.js.map