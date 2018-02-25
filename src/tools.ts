namespace tools {
    export function randomRange(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    export function choose(...args: any[]): any {
        if (args.length > 0) {
            return args[Math.round(Math.random() * (args.length - 1))];
        } else {
            return null;
        }
    }

    export function sum(list: number[]): number {
        let sum = 0;
        for (let i = 0; i < list.length; i ++) { sum += list[i]; }
        return sum;
    }

    export function copyObject(object: object): any {
        return JSON.parse(JSON.stringify(object));
    }

    export function clamp(x: number, min: number, max: number) {
        if (x < min) {
            return min;
        } else if (x > max) {
            return max;
        } else {
            return x;
        }
    }

    export function contains(arr: any[], value) {
        // This functions returns true if value is in arr ...
        // -1 means there was no match, meaning if we get anything greater
        // thatn -1, we have a successful match ...
        return arr.indexOf(value) > -1;
    }

    export function makeIterator(arr: any[]): object {

        return {
            nextIndex: 0,
            next: () => {
                return this.nextIndex < arr.length ?
                    {value: arr[this.nextIndex ++], done: false} :
                    {done: true};
            },
        };
    }

    export function hexToHash(hex: number): string {
        // A randomised hex will likely return something like '5651037.562356'
        // which will not convert simply using this method, work out a way to
        // make it truncate the end part and parse it properly ...
        return "#" + hex.toString(16);
    }

    export function linearInterpolate(from: {x: number, y: number}, to: {x: number, y: number}, marker: number) {
        console.assert(from.x < to.x, "linearInterpolate(): to.x must be greater than from.x");
        console.assert(from.x <= marker, "linearInterpolate(): from.x must be less than or equal to p");
        console.assert(marker <= to.x, "linearInterpolate(): p must be less than or equal to to.x");

        return from.y + (marker - from.x) * (to.y - from.y) / (to.x - from.x);
    }

    export function linearInterpolatePoints(points: Array<{x: number, y: number}>, steps: number) {
        console.assert(points[0].x === 0, "Points must start from 0");
        console.assert(points[points.length - 1].x === 1, "Points must end with 1");
        console.assert(steps > 1);
        console.assert(points.length > 1);

        const s = steps - 1;
        const c = 1 / s;
        const positions: number[] = [];
        for (let i = 1; i < points.length; i ++) {
            for (let j = (Math.ceil(points[i - 1].x / c)) * c; j <= points[i].x; j += c) {
                positions.push(linearInterpolate(points[i - 1], points[i], j));
            }
        }

        console.assert(positions.length === steps, "positions.length and steps aren't equal");
        return positions;
    }

    export function msToTime(s) {

        // Pad to 2 or 3 digits, default is 2
        function pad(n, z = 0) {
            z = z || 2;
            return ("00" + n).slice(-z);
        }

        const ms = s % 1000;
        s = (s - ms) / 1000;
        const secs = s % 60;
        s = (s - secs) / 60;
        const mins = s % 60;
        const hrs = (s - mins) / 60;

        // return pad(hrs) + ':' + pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3); HH:MM:SS.MILLI
        // return pad(hrs) + ':' + pad(mins) + ':' + pad(secs); HH:MM:SS
        return pad(mins) + ":" + pad(secs);
    }
}