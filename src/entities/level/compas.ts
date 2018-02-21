namespace Level {
    export class Compas {
        public up: boolean;
        public down: boolean;
        public left: boolean;
        public right: boolean;

        constructor(
            up: boolean = true,
            down: boolean = true,
            left: boolean = true,
            right: boolean = true,
        ) {
            this.up = up;
            this.down = down;
            this.left = left;
            this.right = right;
        }
    }
}