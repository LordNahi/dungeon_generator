namespace Screens {
    export class LoadingScreen extends Phaser.State {

        constructor() {
            super();
        }

        public create() {
            game.load.onLoadStart.addOnce(this.onLoadStart, this);
            game.load.onLoadComplete.addOnce(this.onLoadComplete, this);

            this.prepareLoadStack();
        }

        private prepareLoadStack() {
            // Add your assets here using asset packs or standard game.load ...
            // this.game.load.image("blah", "blah/blah/blah.bmp");

            // Kick off loader ...
            this.game.load.start();
        }

        private onLoadStart() {
            console.log("Loading assets ...");
        }

        private onLoadComplete() {
            console.log("Assets loaded! Moving to next state ...");
            this.game.state.start("main", true, false);
        }
    }
}